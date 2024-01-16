import { PrismaClient } from "@prisma/client";

import fs from "fs";

import {
  missingParameter,
  notFound,
  serverError,
  deleteFileError,
} from "../errors/customErrors";

const prisma = new PrismaClient();

const deletePartnerLogo = async (logoUrl) => {
  const filename = logoUrl.split("/images/")[1];
  try {
    fs.unlinkSync(`images/${filename}`);
  } catch (unlinkError) {
    console.error(deleteFileError, unlinkError);
    throw new Error(deleteFileError);
  }
};

const PartnersController = {
  createPartner: async (req, res) => {
    const { nom, informations } = req.body;

    if (!nom || !informations) {
      return res.status(400).json({
        error: missingParameter,
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
        error: serverError,
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
          error: notFound,
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all partners.", partners });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getSinglePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({
        error: missingParameter,
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
          error: notFound,
        });
      }

      return res
        .status(200)
        .json({ message: "Partner retrieved successfully.", partner });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  updatePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({ error: missingParameter });
    }

    try {
      const { nom, informations } = req.body;

      const partner = await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({ error: notFound });
      }

      if (partner.logo) {
        let logo = partner.logo;
        if (req.file && req.file.filename) {
          await deletePartnerLogo(partner.logo);
          logo = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }

        const updatedPartner = await prisma.partner.update({
          where: { id: partnerId },
          data: { nom, informations, logo },
          select: { id: true, nom: true, informations: true, logo: true },
        });

        return res.status(200).json({
          message: "Partner was updated successfully.",
          updatedPartner,
        });
      } else {
        if (req.file) {
          logo = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }

        const updatedPartner = await prisma.partner.update({
          where: { id: partnerId },
          data: { nom, informations, logo },
          select: { id: true, nom: true, informations: true, logo: true },
        });

        return res.status(200).json({
          message: "Partner was updated successfully.",
          updatedPartner,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: serverError });
    }
  },

  deletePartner: async (req, res) => {
    const partnerId = req.params.id;

    if (!partnerId) {
      return res.status(400).json({ error: missingParameter });
    }

    try {
      const partner = await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({ error: notFound });
      }

      if (partner.logo) {
        await deletePartnerLogo(partner.logo);
      }

      await prisma.partner.delete({
        where: { id: partnerId },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: serverError });
    }
  },
};

export default PartnersController;
