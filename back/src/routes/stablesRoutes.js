import express from "express";
import StablesController from "../controllers/stablesController";

import { multipleMulter as multer } from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, multer, StablesController.createStable);
router.get("/", StablesController.getAllStables);
router.get("/:id", StablesController.getSingleStable);
router.get("/url/:url", StablesController.getStableByUrl);
router.patch("/:id", verifyToken, multer, StablesController.updateStable);
router.delete("/:id", verifyToken, StablesController.deleteStable);

export default router;
