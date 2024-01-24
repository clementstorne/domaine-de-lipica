import express from "express";
import EventsController from "../controllers/eventsController";

import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, EventsController.createEvent);
router.get("/", EventsController.getAllEvents);
router.get("/:id", EventsController.getSingleEvent);
router.patch("/:id", verifyToken, EventsController.updateEvent);
router.delete("/:id", verifyToken, EventsController.deleteEvent);

export default router;
