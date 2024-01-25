import express from "express";
import CarouselController from "../controllers/carouselController";

import { singleMulter as multer } from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, multer, CarouselController.addCarouselImage);
router.get("/", CarouselController.getAllCarouselImages);
router.get("/:id", CarouselController.getSingleCarouselImage);
router.patch(
  "/:id",
  verifyToken,
  multer,
  CarouselController.updateCarouselImage
);
router.delete("/:id", verifyToken, CarouselController.deleteCarouselImage);

export default router;
