"use server";

import prisma from "@/lib/prisma";
import { Event } from "@/types";
import { revalidatePath } from "next/cache";

type Data = Event;

export const updateEvent = async (data: Data) => {
  await prisma.event.update({
    where: { id: data.id },
    data: {
      debut: data.debut,
      fin: data.fin,
      discipline: data.discipline,
      niveau: data.niveau,
      horaires: data.horaires ? data.horaires : "",
      lienWinJump: data.lienWinJump ? data.lienWinJump : "",
    },
  });
  revalidatePath("/dashboard/concours");
  revalidatePath("/concours");
  revalidatePath("/");
};
