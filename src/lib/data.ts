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
