import express from "express";
import CarouselController from "../controllers/carouselController";

import { singleMulter as multer } from "../middlewares/multer";

const router = express.Router();

router.post("/", multer, CarouselController.addCarouselImage);
router.get("/", CarouselController.getAllCarouselImages);
router.get("/:id", CarouselController.getSingleCarouselImage);
router.patch("/:id", multer, CarouselController.updateCarouselImage);
router.delete("/:id", CarouselController.deleteCarouselImage);

export default router;
