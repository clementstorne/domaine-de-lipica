"use server";

import prisma from "@/lib/prisma";
import { Event } from "@/types";
import { revalidatePath } from "next/cache";

type Data = Omit<Event, "id">;

export const createEvent = async (data: Data) => {
  await prisma.event.create({
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
