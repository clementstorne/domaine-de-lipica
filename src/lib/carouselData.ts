import prisma from "@/lib/prisma";

export const getImagesForCarousel = async () => {
  const images = await prisma.carousel.findMany();
  return images;
};
