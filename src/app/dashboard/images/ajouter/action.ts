"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createImage = async (formData: FormData) => {
  const title = (await formData.get("title")) as string;
  const alt = (await formData.get("alt")) as string;
  const file = (await formData.get("image")) as File;

  if (file.size !== 0) {
    const fileName = "carousel-" + Date.now();

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

    await prisma.carousel.create({
      data: {
        title: title,
        alt: alt,
        url: uploadedFile.public_id,
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
    redirect("/dashboard/images/");
  } else {
    await prisma.carousel.create({
      data: {
        title: title,
        alt: alt,
        url: "",
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
    redirect("/dashboard/images/");
  }
};
