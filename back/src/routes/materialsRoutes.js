import express from "express";
import auth from "../middleware/auth.js";
import { all, add, update, statistics } from "../controller/materials.controller.js"

const router = express.Router();

router.get("/all", all);
router.post("/add", auth, add);
router.put("/update", auth, update);
router.get("/statistics", auth, statistics);

export default router;