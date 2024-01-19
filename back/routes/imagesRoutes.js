import express from "express";
import ImagesController from "../controllers/imagesController";

const router = express.Router();

router.delete("/:url", ImagesController.deleteImage);

export default router;
