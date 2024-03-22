"use server";

import prisma from "@/lib/prisma";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const deleteOldLogo = async (oldLogo: string) => {
  const filename = oldLogo.split("/logos/")[1];
  const filePath = join(process.cwd(), "public/logos/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
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

    const path = join(process.cwd(), "public/logos/" + fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);

    if (partner.logo) {
      await deleteOldLogo(partner.logo);
    }

    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        nom: nom,
        informations: informations,
        logo: "/logos/" + fileName,
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
