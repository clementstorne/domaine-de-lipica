import express from "express";
import EventsController from "../controllers/eventsController";

const router = express.Router();

router.post("/", EventsController.createEvent);
router.get("/", EventsController.getAllEvents);
router.get("/:id", EventsController.getSingleEvent);
router.patch("/:id", EventsController.updateEvent);
router.delete("/:id", EventsController.deleteEvent);

export default router;
