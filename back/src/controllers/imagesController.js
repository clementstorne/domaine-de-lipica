import { PrismaClient } from "@prisma/client";

import {
  missingParameter,
  notFound,
  serverError,
} from "../errors/customErrors";
import { deleteImageFromDirectory } from "../utils/imageUtils";

const prisma = new PrismaClient();

const ImagesController = {
  deleteImage: async (req, res) => {
    const imageUrl = "/" + req.params.url;

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
