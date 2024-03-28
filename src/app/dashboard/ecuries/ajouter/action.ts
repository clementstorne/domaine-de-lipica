"use server";

import prisma from "@/lib/prisma";
import { stringToUrl } from "@/lib/string";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const createStable = async (formData: FormData) => {
  const nom = (await formData.get("nom")) as string;
  const informations = (await formData.get("informations")) as string;
  const files = (await formData.getAll("image")) as File[];

  const stable = await prisma.stable.create({
    data: {
      nom: nom,
      informations: informations,
      url: stringToUrl(nom),
    },
  });

  if (files[0].size !== 0) {
    const MIME_TYPES: Record<string, string> = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/svg+xml": "svg",
      "image/webp": "webp",
    };

    files.forEach(async (file) => {
      const extension = MIME_TYPES[file.type];
      if (!extension) {
        throw new Error("Unsupported file type");
      }

      const fileName =
        file.name.toLowerCase().split(".")[0].split(" ").join("-") +
        "." +
        extension;

      const path = join(process.cwd(), "public/ecuries/" + fileName);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(path, buffer);

      await prisma.stable.update({
        where: { id: stable.id },
        data: {
          images: {
            create: { url: "/ecuries/" + fileName },
          },
        },
      });
    });
  }

  revalidatePath("/dashboard/ecuries");
  revalidatePath("/ecuries");
  redirect("/dashboard/ecuries/");
};

export const deleteSingleImage = async (image: string) => {
  const filename = image.split("/ecuries/")[1];
  const filePath = join(process.cwd(), "public/ecuries/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
    await prisma.images.delete({ where: { url: image } });
  }
};
