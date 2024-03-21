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
  console.log(1);

  if (!file) {
    console.log(2);
    throw new Error("No file provided");
  }

  const filename = formatImageFileName(file);
  console.log(3);

  const bytes = await file.arrayBuffer();
  console.log(4);
  const buffer = Buffer.from(bytes);
  console.log(5);

  const path = join(process.cwd(), "public/logos/" + filename);
  console.log(6);
  try {
    await writeFile(path, buffer);
    console.log(7);
    await deleteOldLogo(oldLogo);
    console.log(8);
  } catch (error) {
    console.log(9);
    console.error(error);
  }

  return { sucess: true };
};
