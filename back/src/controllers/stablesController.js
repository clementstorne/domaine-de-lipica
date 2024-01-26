import { PrismaClient } from "@prisma/client";

import fs from "fs";

import {
  deleteFileError,
  missingParameter,
  notFound,
  serverError,
} from "../errors/customErrors";

const prisma = new PrismaClient();

missingParameter;

const StablesController = {
  createStable: async (req, res) => {
    const { nom, informations, url } = req.body;

    if (!nom || !informations || !url) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      let images = [];
      if (req.files && req.files.length > 0) {
        images = req.files.map((file) => ({
          url: `/${req.file.filename}`,
        }));
      }

      const newStable = await prisma.stable.create({
        data: {
          nom,
          informations,
          url,
          images: {
            create: images,
          },
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      return res
        .status(201)
        .json({ message: "Stable successfully created.", newStable });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getAllStables: async (_, res) => {
    try {
      const stables = await prisma.stable.findMany({
        select: {
          id: true,
          nom: true,
          informations: true,
          url: true,
          images: {
            select: {
              url: true,
            },
          },
        },
        orderBy: [
          {
            nom: "asc",
          },
        ],
      });

      if (!stables) {
        return res.status(404).json({
          error: notFound,
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all stables.", stables });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getSingleStable: async (req, res) => {
    const stableId = req.params.id;

    if (!stableId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const stable = await prisma.stable.findUniqueOrThrow({
        where: {
          id: stableId,
        },
        select: {
          id: true,
          nom: true,
          informations: true,
          url: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Stable retrieved successfully.", stable });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  getStableByUrl: async (req, res) => {
    const stableUrl = req.params.url;

    if (!stableUrl) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const stable = await prisma.stable.findFirstOrThrow({
        where: {
          url: stableUrl,
        },
        select: {
          id: true,
          nom: true,
          informations: true,
          url: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Stable retrieved successfully.", stable });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  updateStable: async (req, res) => {
    const stableId = req.params.id;

    if (!stableId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const { nom, informations, url } = req.body;

      const stable = await prisma.stable.findUniqueOrThrow({
        where: {
          id: stableId,
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      if (!stable) {
        return res.status(404).json({
          error: notFound,
        });
      }

      let newImages = [];

      if (req.files && req.files.length > 0) {
        const newImagesUrl = req.files.map((file) => ({
          url: `/${req.file.filename}`,
        }));
        newImages = [...newImagesUrl];
      }

      const updatedStable = await prisma.stable.update({
        where: {
          id: stableId,
        },
        data: {
          nom,
          informations,
          url,
          images: {
            create: newImages.map((image) => ({ url: image.url })),
          },
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: "Stable successfully updated.",
        updatedStable,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  deleteStable: async (req, res) => {
    const stableId = req.params.id;

    if (!stableId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const stable = await prisma.stable.findUniqueOrThrow({
        where: {
          id: stableId,
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      if (!stable) {
        return res.status(404).json({
          error: notFound,
        });
      }

      if (stable.images && stable.images.length > 0) {
        await Promise.all(
          stable.images.map(async (image) => {
            const filename = image.url.split("/images/")[1];
            try {
              await fs.unlinkSync(`images/${filename}`);
            } catch (unlinkError) {
              console.error(deleteFileError, unlinkError);
              return res.status(500).json({
                error: deleteFileError,
              });
            }
          })
        );
      }

      await prisma.stable.delete({
        where: {
          id: stableId,
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

export default StablesController;
