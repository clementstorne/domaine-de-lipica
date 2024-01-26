import { PrismaClient } from "@prisma/client";

import {
  missingParameter,
  notFound,
  serverError,
} from "../errors/customErrors";
import { deleteImageFromDirectory } from "../utils/imageUtils";

const prisma = new PrismaClient();

const CarouselController = {
  addCarouselImage: async (req, res) => {
    const { title, alt } = req.body;

    if (!title || !alt || !req.file) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      let url = `/${req.file.filename}`;

      const newCarouselImage = await prisma.carousel.create({
        data: {
          url,
          title,
          alt,
        },
      });

      return res
        .status(201)
        .json({ message: "Image successfully created.", newCarouselImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getAllCarouselImages: async (_, res) => {
    try {
      const images = await prisma.carousel.findMany({
        select: { id: true, url: true, title: true, alt: true },
      });
      return res
        .status(200)
        .json({ message: "Successfully got all images.", images });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getSingleCarouselImage: async (req, res) => {
    const imageId = req.params.id;

    if (!imageId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const image = await prisma.carousel.findUniqueOrThrow({
        where: {
          id: imageId,
        },
        select: { id: true, url: true, title: true, alt: true },
      });
      return res
        .status(200)
        .json({ message: "Image retrieved successfully.", image });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  updateCarouselImage: async (req, res) => {
    const imageId = req.params.id;

    if (!imageId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const credentials = req.body;

      const updatedImage = await prisma.carousel.update({
        where: {
          id: imageId,
        },
        data: credentials,
        select: { id: true, url: true, title: true, alt: true },
      });

      return res.status(200).json({
        message: "Image was updated successfully.",
        updatedImage,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  deleteCarouselImage: async (req, res) => {
    const imageId = req.params.id;

    if (!imageId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const image = await prisma.carousel.findUniqueOrThrow({
        where: {
          id: imageId,
        },
      });

      if (!image) {
        return res.status(404).json({
          error: notFound,
        });
      }

      await deleteImageFromDirectory(image.url);

      await prisma.carousel.delete({
        where: {
          id: image.id,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },
};

export default CarouselController;
