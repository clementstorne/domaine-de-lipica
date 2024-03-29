import prisma from "@/lib/prisma";

export const getStables = async () => {
  const stables = await prisma.stable.findMany({
    orderBy: {
      nom: "asc",
    },
    select: {
      id: true,
      nom: true,
      url: true,
      informations: true,
      images: true,
    },
  });
  return stables;
};

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

export const getSingleStable = async (stableId: string) => {
  const stable = await prisma.stable.findFirst({
    where: {
      id: stableId,
    },
    select: {
      id: true,
      nom: true,
      url: true,
      informations: true,
      images: true,
    },
  });
  return stable;
};

export const getSingleStableByUrl = async (stableUrl: string) => {
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
