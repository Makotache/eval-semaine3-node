import express from "express";
import auth from "../middleware/auth.js";
import { all, add, update } from "../controller/products.controller.js"

const router = express.Router();

router.get("/all", all);
router.post("/add", auth, add);
router.put("/update", auth, update);

export default router;