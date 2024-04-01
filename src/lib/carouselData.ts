import prisma from "@/lib/prisma";

export const getImagesForCarousel = async () => {
  const images = await prisma.carousel.findMany();
  return images;
};

export const getSingleImage = async (imageId: string) => {
  const image = await prisma.carousel.findFirst({
    where: {
      id: imageId,
    },
  });
  return image;
};
