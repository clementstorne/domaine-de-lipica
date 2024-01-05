import express from "express";
import EventController from "../controllers/eventController";

const router = express.Router();

router.post("/", EventController.createEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getSingleEvent);
router.patch("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;
