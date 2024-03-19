"use server";

import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { createEventSchema } from "@/lib/validationSchema";
import { revalidatePath } from "next/cache";

export const createEvent = authenticatedAction(
  createEventSchema,
  async ({ debut, fin, discipline, niveau, horaires, lienWinJump }) => {
    await prisma.event.create({
      data: {
        debut: debut,
        fin: fin,
        discipline: discipline,
        niveau: niveau,
        horaires: horaires ? horaires : "",
        lienWinJump: lienWinJump ? lienWinJump : "",
      },
    });
    revalidatePath("/dashboard/concours");
    revalidatePath("/concours");
    revalidatePath("/");
  }
);
