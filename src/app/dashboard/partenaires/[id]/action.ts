"use server";

import { updatePartnerSchema } from "@/lib/partnerSchemaValidation";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export const updatePartner = authenticatedAction(
  updatePartnerSchema,
  async ({ id, nom, informations }) => {
    await prisma.partner.update({
      where: { id: id },
      data: {
        nom,
        informations,
      },
    });
    revalidatePath("/dashboard/partenaires");
    revalidatePath("/partenaires");
  }
);

export const deleteOldLogo = async (oldLogo: string) => {
  const filename = oldLogo.split("/logos/")[1];
  const filePath = join(process.cwd(), "public/logos/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};

export const uploadLogo = async (partnerId: string, formData: FormData) => {
  const file = (await formData.get("image")) as File;

  if (!file) {
    throw new Error("No file provided");
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

  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { logo: true },
  });

  if (!partner) {
    throw new Error("Partner not found");
  }

  if (partner.logo) {
    await deleteOldLogo(partner.logo);
  }

  await prisma.partner.update({
    where: { id: partnerId },
    data: {
      logo: "/logos/" + fileName,
    },
  });

  redirect("/dashboard/partenaires/");
};
