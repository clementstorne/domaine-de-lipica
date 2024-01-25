import express from "express";
import PartnersController from "../controllers/partnersController";

import { singleMulter as multer } from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, multer, PartnersController.createPartner);
router.get("/", PartnersController.getAllPartners);
router.get("/:id", PartnersController.getSinglePartner);
router.patch("/:id", verifyToken, multer, PartnersController.updatePartner);
router.delete("/:id", verifyToken, PartnersController.deletePartner);

export default router;
