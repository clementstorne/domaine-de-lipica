import express from "express";
import StablesController from "../controllers/stablesController";

import { multipleMulter as multer } from "../middlewares/multer";

const router = express.Router();

router.post("/", multer, StablesController.createStable);
router.get("/", StablesController.getAllStables);
router.get("/:id", StablesController.getSingleStable);
router.get("/url/:url", StablesController.getStableByUrl);
router.patch("/:id", multer, StablesController.updateStable);
router.delete("/:id", StablesController.deleteStable);

export default router;
