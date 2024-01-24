import express from "express";
import ImagesController from "../controllers/imagesController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.delete("/:url", verifyToken, ImagesController.deleteImage);

export default router;
