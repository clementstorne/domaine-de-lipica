"use server";

import { updatePartnerSchema } from "@/lib/partnerSchemaValidation";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { formatImageFileName } from "@/lib/upload";
import { statfs, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

export const updatePartner = authenticatedAction(
  updatePartnerSchema,
  async ({ id, nom, informations, logo }) => {
    if (logo) {
      await prisma.partner.update({
        where: { id: id },
        data: {
          nom,
          informations,
          logo,
        },
      });
    } else {
      await prisma.partner.update({
        where: { id: id },
        data: {
          nom,
          informations,
        },
      });
    }
    revalidatePath("/dashboard/concours");
    revalidatePath("/concours");
    revalidatePath("/");
  }
);

export const deleteOldLogo = async (oldLogo: string) => {
  const filename = oldLogo.split("/logos/")[1];
  const filePath = join(process.cwd(), "public/logos/", filename);
  if (await statfs(filePath)) {
    await unlink(filePath);
  }
};

export const uploadLogo = async (formData: FormData, oldLogo: string) => {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const filename = formatImageFileName(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public/logos/" + filename);
  await writeFile(path, buffer);
  await deleteOldLogo(oldLogo);

  return { sucess: true };
};
