"use server";

import { deleteImage } from "@/lib/actions/cloudinary/deleteImage";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateImage = async (imageId: string, formData: FormData) => {
  const title = (await formData.get("title")) as string;
  const alt = (await formData.get("alt")) as string;
  const file = (await formData.get("image")) as File;

  if (file.size !== 0) {
    const image = await prisma.carousel.findUnique({
      where: { id: imageId },
      select: { url: true },
    });

    if (!image) {
      throw new Error("Image not found");
    }

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

    if (image.url) {
      await deleteImage(image.url);
    }

    await prisma.carousel.update({
      where: { id: imageId },
      data: {
        title: title,
        alt: alt,
        url: uploadedFile.public_id,
      },
    });

    revalidatePath("/dashboard/images");
    revalidatePath("/images");
    redirect("/dashboard/images/");
  } else {
    await prisma.carousel.update({
      where: { id: imageId },
      data: {
        title: title,
        alt: alt,
      },
    });
    revalidatePath("/dashboard/images");
    revalidatePath("/images");
    redirect("/dashboard/images/");
  }
};
