import express from "express";
import cors from "cors";
import path from "path";

import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import stablesRoutes from "./routes/stablesRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/", (_, res) => {
  res.status(200).json("Welcome to Domaine de Lipica backend");
});

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);
app.use("/partners", partnersRoutes);
app.use("/stables", stablesRoutes);
app.use("/images", imagesRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

const publicPath = path.join(__dirname, "./build");
app.use(express.static(publicPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
