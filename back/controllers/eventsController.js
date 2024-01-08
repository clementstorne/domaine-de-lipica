import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EventsController = {
  createEvent: async (req, res) => {
    const { debut, fin, discipline, niveau, horaires, lienWinJump } = req.body;

    if (!debut || !fin || !discipline || !niveau) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
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
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
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
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all events.", events });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  getSingleEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const event = await prisma.event.findUnique({
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

      if (!event) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Event retrieved successfully.", event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  updateEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
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
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },

  deleteEvent: async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const deletedEvent = await prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      return res.status(204);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default EventsController;
