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
// const corsOptions = {
//   origin: "http://localhost:5173",
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);
app.use("/partners", partnersRoutes);
app.use("/stables", stablesRoutes);
app.use("/images", imagesRoutes);
app.use("/carousel", carouselRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(express.static(publicPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
