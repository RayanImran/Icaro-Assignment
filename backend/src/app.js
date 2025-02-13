import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import threatsRoutes from "./routes/threats.js";
import authRoutes from "./routes/auth.js"; // <-- import the new auth route

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Register routes
app.use("/api", authRoutes); // <-- make sure this is before the protected routes
app.use("/api", threatsRoutes);

export { app };
