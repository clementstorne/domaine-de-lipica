import { PrismaClient } from "@prisma/client";

import fs from "fs";

import {
  missingParameter,
  notFound,
  serverError,
  deleteFileError,
} from "../errors/customErrors";

const prisma = new PrismaClient();

const deleteImageFromDirectory = async (imageUrl) => {
  const filename = imageUrl.split("/images/")[1];
  try {
    fs.unlinkSync(`images/${filename}`);
  } catch (unlinkError) {
    console.error(deleteFileError, unlinkError);
    throw new Error(deleteFileError);
  }
};

const ImagesController = {
  deleteImage: async (req, res) => {
    const imageUrl = "http://localhost:3000/images/" + req.params.url;

    if (!imageUrl) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const image = await prisma.images.findUniqueOrThrow({
        where: {
          url: imageUrl,
        },
      });

      if (!image) {
        return res.status(404).json({
          error: notFound,
        });
      }

      await deleteImageFromDirectory(image.url);

      await prisma.images.delete({
        where: {
          url: image.url,
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

export default ImagesController;
