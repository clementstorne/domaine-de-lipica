"use server";

import prisma from "@/lib/prisma";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const deleteOldImage = async (oldImage: string) => {
  const filename = oldImage.split("/carousel/")[1];
  const filePath = join(process.cwd(), "public/carousel/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};

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

    const MIME_TYPES: Record<string, string> = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/svg+xml": "svg",
      "image/webp": "webp",
    };

    const extension = MIME_TYPES[file.type];

    if (!extension) {
      throw new Error("Unsupported file type");
    }

    const fileName =
      file.name.toLowerCase().split(".")[0].split(" ").join("-") +
      "." +
      extension;

    const path = join(process.cwd(), "public/carousel/" + fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);

    if (image.url) {
      await deleteOldImage(image.url);
    }

    await prisma.carousel.update({
      where: { id: imageId },
      data: {
        title: title,
        alt: alt,
        url: "/carousel/" + fileName,
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
