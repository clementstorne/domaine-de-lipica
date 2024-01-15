import { PrismaClient } from "@prisma/client";

import fs from "fs";

const prisma = new PrismaClient();

const PartnersController = {
  createStable: async (req, res) => {
    const { nom, informations, url } = req.body;

    if (!nom || !informations || !url) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      let images = [];
      if (req.file && req.file.filename) {
        images.push({
          url: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        });
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
      });

      return res
        .status(201)
        .json({ message: "Stable successfully created.", newStable });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
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
          images: true,
        },
        orderBy: [
          {
            nom: "asc",
          },
        ],
      });

      if (!stables) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all stables.", stables });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  getSingleStable: async (req, res) => {
    const stableId = req.params.id;

    if (!stableId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const stable = await prisma.stable.findUnique({
        where: {
          id: stableId,
        },
        select: {
          id: true,
          nom: true,
          informations: true,
          url: true,
          images: true,
        },
      });

      if (!stable) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Stable retrieved successfully.", stable });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  deleteStable: async (req, res) => {
    const stableId = req.params.id;

    if (!stableId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const stable = await prisma.stable.findUnique({
        where: {
          id: stableId,
        },
      });

      if (!stable) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      // if (stable.images) {
      //   const filename = stable.images.split("/images/")[1];
      //   try {
      //     fs.unlinkSync(`images/${filename}`);
      //   } catch (unlinkError) {
      //     console.error("Error deleting old file:", unlinkError);
      //     return res.status(500).json({
      //       error: "Error deleting old file",
      //     });
      //   }
      // }

      await prisma.stable.delete({
        where: {
          id: stableId,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default PartnersController;
