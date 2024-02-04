import { PrismaClient } from "@prisma/client";

import {
  missingParameter,
  notFound,
  serverError,
} from "../errors/customErrors";
import { deleteImageFromDirectory } from "../utils/imageUtils";

const prisma = new PrismaClient();

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
        logo = `/${req.file.filename}`;
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
      const partner = await prisma.partner.findUniqueOrThrow({
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

      const partner = await prisma.partner.findUniqueOrThrow({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({ error: notFound });
      }

      let logo = "";

      if (partner.logo) {
        logo = partner.logo;
        if (req.file && req.file.filename) {
          await deleteImageFromDirectory(partner.logo);
          logo = `/${req.file.filename}`;
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
          logo = `/${req.file.filename}`;
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
      const partner = await prisma.partner.findUniqueOrThrow({
        where: {
          id: partnerId,
        },
      });

      if (!partner) {
        return res.status(404).json({ error: notFound });
      }

      if (partner.logo) {
        await deleteImageFromDirectory(partner.logo);
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
