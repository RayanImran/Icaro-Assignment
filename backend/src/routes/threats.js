import express from "express";
import { fetchThreats } from "../controllers/threatsController.js";

const router = express.Router();

router.get("/threats", fetchThreats);

export default router;
