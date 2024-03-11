import { isInFuture } from "@/lib/dateUtils";
import prisma from "@/lib/prisma";

export const getStablesForNavbar = async () => {
  const stables = await prisma.stable.findMany({
    orderBy: {
      nom: "asc",
    },
    select: {
      nom: true,
      url: true,
    },
  });
  return stables;
};

export const getSingleStable = async (stableUrl: string) => {
  const stable = await prisma.stable.findFirst({
    where: {
      url: stableUrl,
    },
    select: {
      nom: true,
      url: true,
      informations: true,
      images: true,
    },
  });
  return stable;
};

export const getStableName = async (stableUrl: string) => {
  const stable = await prisma.stable.findFirst({
    where: {
      url: stableUrl,
    },
    select: {
      nom: true,
    },
  });
  return stable;
};

export const getPartners = async () => {
  const partners = await prisma.partner.findMany({
    orderBy: {
      nom: "asc",
    },
    select: {
      id: true,
      nom: true,
      logo: true,
      informations: true,
    },
  });
  return partners;
};

export const getPartnersLogos = async () => {
  const partners = await prisma.partner.findMany({
    where: {
      NOT: {
        logo: "",
      },
    },
    orderBy: {
      nom: "asc",
    },
    select: {
      id: true,
      nom: true,
      logo: true,
    },
  });
  return partners;
};

export const getImagesForCarousel = async () => {
  const images = await prisma.carousel.findMany();
  return images;
};

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
