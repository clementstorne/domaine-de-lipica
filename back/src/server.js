import cors from "cors";
import express from "express";
import path from "path";

import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import stablesRoutes from "./routes/stablesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/api/", (_, res) => {
  res.status(200).json("Welcome to Domaine de Lipica backend");
});
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/stables", stablesRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/carousel", carouselRoutes);

app.use("/api/images", express.static(path.join(__dirname, "../dist/images")));

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
