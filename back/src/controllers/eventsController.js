import { PrismaClient } from "@prisma/client";

import {
  missingParameter,
  notFound,
  serverError,
} from "../errors/customErrors";

const prisma = new PrismaClient();

const EventsController = {
  createEvent: async (req, res) => {
    const { debut, fin, discipline, niveau, horaires, lienWinJump } = req.body;

    if (!debut || !fin || !discipline || !niveau) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const newEvent = await prisma.event.create({
        data: {
          debut,
          fin,
          discipline,
          niveau,
          horaires,
          lienWinJump,
        },
      });

      return res
        .status(201)
        .json({ message: "Event successfully created.", newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getAllEvents: async (_, res) => {
    try {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          debut: true,
          fin: true,
          discipline: true,
          niveau: true,
          horaires: true,
          lienWinJump: true,
        },
        orderBy: [
          {
            debut: "asc",
          },
        ],
      });

      if (!events) {
        return res.status(404).json({
          error: notFound,
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all events.", events });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: serverError,
      });
    }
  },

  getSingleEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const event = await prisma.event.findUniqueOrThrow({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          debut: true,
          fin: true,
          discipline: true,
          niveau: true,
          horaires: true,
          lienWinJump: true,
        },
      });

      return res
        .status(200)
        .json({ message: "Event retrieved successfully.", event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  updateEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      const credentials = req.body;

      const updatedEvent = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: credentials,
        select: {
          id: true,
          debut: true,
          fin: true,
          discipline: true,
          niveau: true,
          horaires: true,
          lienWinJump: true,
        },
      });

      return res
        .status(200)
        .json({ message: "Event was updated successfully.", updatedEvent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: serverError,
      });
    }
  },

  deleteEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error: missingParameter,
      });
    }

    try {
      await prisma.event.delete({
        where: {
          id: eventId,
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

export default EventsController;
