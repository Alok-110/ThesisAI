import express from "express";
import { runResearch, getHistory, getResearchById } from "../controllers/research.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.post("/", verifyJWT, runResearch);
router.get("/", verifyJWT, getHistory);
router.get("/:id", verifyJWT, getResearchById);

export default router;