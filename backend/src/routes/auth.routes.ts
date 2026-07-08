import express from "express";
import { signup, login, logout, me } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyJWT, me);

export default router;