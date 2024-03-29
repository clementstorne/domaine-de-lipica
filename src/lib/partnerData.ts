import prisma from "@/lib/prisma";

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

export const getSinglePartner = async (partnerId: string) => {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: {
      id: true,
      nom: true,
      logo: true,
      informations: true,
    },
  });
  return partner;
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
