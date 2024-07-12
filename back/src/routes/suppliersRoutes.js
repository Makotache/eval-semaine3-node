import express from "express";
import auth from "../middleware/auth.js";
import { all, add, update } from "../controller/suppliers.controller.js"

const router = express.Router();

router.get("/all", auth, all);
router.post("/add", auth, add);
router.put("/update", auth, update);

export default router;