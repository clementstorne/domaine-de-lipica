import express from "express";
import PartnersController from "../controllers/partnersController";

import multer from "../middlewares/multer";

const router = express.Router();

router.post("/", multer, PartnersController.createPartner);
router.get("/", PartnersController.getAllPartners);
router.get("/:id", PartnersController.getSinglePartner);
router.patch("/:id", multer, PartnersController.updatePartner);
router.delete("/:id", PartnersController.deletePartner);

export default router;
