import express from "express";
import { getSummaries, createSummary } from "../controllers/summaryController";
import  authenticate from "../middleware/authMiddleware";

const summariesRoutes = express.Router();

summariesRoutes.get("/", authenticate, getSummaries);
summariesRoutes.post("/", authenticate, createSummary);

export default summariesRoutes;