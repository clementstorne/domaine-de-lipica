import { PrismaClient } from "@prisma/client";

import fs from "fs";

const prisma = new PrismaClient();

const PartnersController = {
  createPartner: async (req, res) => {
    const { nom, informations } = req.body;

    if (!nom || !informations) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      let logo = "";
      if (req.file && req.file.filename) {
        logo = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }

      const newPartner = await prisma.partner.create({
        data: {
          nom,
          informations,
          logo,
        },
      });

      return res
        .status(201)
        .json({ message: "Partner successfully created.", newPartner });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  getAllPartners: async (_, res) => {
    try {
      const partners = await prisma.partner.findMany({
        select: {
          id: true,
          nom: true,
          informations: true,
          logo: true,
        },
        orderBy: [
          {
            nom: "asc",
          },
        ],
      });

      if (!partners) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all partners.", partners });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  getSinglePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const partner = await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
        select: {
          id: true,
          nom: true,
          informations: true,
          logo: true,
        },
      });

      if (!partner) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Partner retrieved successfully.", partner });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  updatePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const { nom, informations } = req.body;
      let logo = "";

      const partner = await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      if (partner.logo) {
        if (req.file && req.file.filename) {
          const filename = partner.logo.split("/images/")[1];
          try {
            fs.unlinkSync(`images/${filename}`);
          } catch (unlinkError) {
            console.error("Error deleting old file:", unlinkError);
            return res.status(500).json({
              error: "Error deleting old file",
            });
          }
          logo = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          const updatedPartner = await prisma.partner.update({
            where: {
              id: partnerId,
            },
            data: { nom, informations, logo },
            select: {
              id: true,
              nom: true,
              informations: true,
              logo: true,
            },
          });
        } else {
          const updatedPartner = await prisma.partner.update({
            where: {
              id: partnerId,
            },
            data: { nom, informations },
            select: {
              id: true,
              nom: true,
              informations: true,
              logo: true,
            },
          });

          return res.status(200).json({
            message: "Partner was updated successfully.",
            updatedPartner,
          });
        }
      } else {
        if (req.file && req.file.filename) {
          logo = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }

        const updatedPartner = await prisma.partner.update({
          where: {
            id: partnerId,
          },
          data: { nom, informations, logo },
          select: {
            id: true,
            nom: true,
            informations: true,
            logo: true,
          },
        });

        return res.status(200).json({
          message: "Partner was updated successfully.",
          updatedPartner,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  deletePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const partner = await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      if (partner.logo) {
        const filename = partner.logo.split("/images/")[1];
        try {
          fs.unlinkSync(`images/${filename}`);
        } catch (unlinkError) {
          console.error("Error deleting old file:", unlinkError);
          return res.status(500).json({
            error: "Error deleting old file",
          });
        }
      }

      await prisma.partner.delete({
        where: {
          id: partnerId,
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
