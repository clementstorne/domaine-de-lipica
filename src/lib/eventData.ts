import { dateToStringDate } from "@/lib/date";
import prisma from "@/lib/prisma";

export const getNextEvents = async () => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    take: 3,
    where: {
      debut: {
        gte: today,
      },
    },
    select: {
      debut: true,
      fin: true,
      discipline: true,
      niveau: true,
    },
    orderBy: [
      {
        debut: "asc",
      },
    ],
  });
};

export const getFutureEvents = async () => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      fin: {
        gte: today,
      },
    },
    select: {
      id: true,
      debut: true,
      fin: true,
      discipline: true,
      niveau: true,
      horaires: true,
      lienWinJump: true,
    },
    orderBy: [
      {
        debut: "asc",
      },
    ],
  });
};

export const getPastEvents = async () => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      fin: {
        lt: today,
      },
    },
    select: {
      id: true,
      debut: true,
      fin: true,
      discipline: true,
      niveau: true,
      horaires: true,
      lienWinJump: true,
    },
    orderBy: [
      {
        debut: "desc",
      },
    ],
  });
};

export const getSingleEvent = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      id: true,
      debut: true,
      fin: true,
      discipline: true,
      niveau: true,
      horaires: true,
      lienWinJump: true,
    },
  });

  return event;
};
