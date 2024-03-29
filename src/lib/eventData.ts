import { isInFuture } from "@/lib/date";
import prisma from "@/lib/prisma";

export const getNextEvents = async () => {
  const events = await prisma.event.findMany({
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

  const futureEvents = events.filter((event) => isInFuture(event.debut));
  return futureEvents.slice(0, 3);
};

export const getFutureEvents = async () => {
  const events = await prisma.event.findMany({
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

  const futureEvents = events.filter((event) => isInFuture(event.debut));
  return futureEvents;
};

export const getPastEvents = async () => {
  const events = await prisma.event.findMany({
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

  const pastEvents = events.filter((event) => !isInFuture(event.debut));
  return pastEvents;
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
    },
  });

  return event;
};
