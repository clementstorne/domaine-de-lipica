"use server";

import { updatePartnerSchema } from "@/lib/partnerSchemaValidation";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const updatePartner = authenticatedAction(
  updatePartnerSchema,
  async ({ id, nom, informations, logo }) => {
    await prisma.partner.update({
      where: { id: id },
      data: {
        nom,
        informations,
        // logo: logo ? logo : "",
      },
    });
    revalidatePath("/dashboard/concours");
    revalidatePath("/concours");
    revalidatePath("/");
  }
);
