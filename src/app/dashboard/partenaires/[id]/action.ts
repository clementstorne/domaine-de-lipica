"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteOldLogo = async (oldLogo: string) => {
  // const publicId = oldLogo.split("upload/")[1].split("/")[1].split(".")[0];

  await new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(oldLogo, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

export const updatePartner = async (partnerId: string, formData: FormData) => {
  const nom = (await formData.get("nom")) as string;
  const informations = (await formData.get("informations")) as string;
  const file = (await formData.get("image")) as File;

  if (file) {
    const partner = await prisma.partner.findUnique({
      where: { id: partnerId },
      select: { logo: true },
    });

    if (!partner) {
      throw new Error("Partner not found");
    }

    const fileName = file.name.toLowerCase().split(".")[0].split(" ").join("-");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadedFile = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "lipica",
            display_name: fileName,
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    })) as any;

    if (partner.logo) {
      await deleteOldLogo(partner.logo);
    }

    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        nom: nom,
        informations: informations,
        logo: uploadedFile.public_id,
      },
    });

    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
    redirect("/dashboard/partenaires/");
  } else {
    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        nom: nom,
        informations: informations,
        logo: "",
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
    redirect("/dashboard/partenaires/");
  }
};
