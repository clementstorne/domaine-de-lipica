"use server";

import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const createImage = async (formData: FormData) => {
  const title = (await formData.get("title")) as string;
  const alt = (await formData.get("alt")) as string;
  const file = (await formData.get("image")) as File;

  if (file.size !== 0) {
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

    await prisma.carousel.create({
      data: {
        title: title,
        alt: alt,
        url: "/carousel/" + fileName,
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
