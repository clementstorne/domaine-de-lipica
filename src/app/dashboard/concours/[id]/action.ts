"use server";

import { updateEventSchema } from "@/lib/eventSchemaValidation";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { Event } from "@/types";
import { revalidatePath } from "next/cache";

type Data = Event;

export const updateEvent = authenticatedAction(
  updateEventSchema,
  async ({ id, debut, fin, discipline, niveau, horaires, lienWinJump }) => {
    await prisma.event.update({
      where: { id: id },
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
