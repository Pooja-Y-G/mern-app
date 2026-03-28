import express from "express";
import { register, login } from "../controllers/authVController";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// router.post("/summaries", summaries)

export default router;