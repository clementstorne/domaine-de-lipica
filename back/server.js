import express from "express";
import cors from "cors";
import path from "path";

import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/", (_, res) => {
  res.status(200).json("Welcome to Domaine de Lipica backend");
});

app.use("/auth", authRoutes);

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
