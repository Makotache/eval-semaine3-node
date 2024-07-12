import express from "express";
import { login, logout, me } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/me", me);
router.get("/logout", logout);
router.post("/login", login);

export default router;