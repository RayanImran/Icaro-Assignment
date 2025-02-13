import express from "express";
import { fetchThreats } from "../controllers/threatsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect the /threats endpoint
router.get("/threats", authMiddleware, fetchThreats);

export default router;
