import express from "express"
import { createFutsal, displayFutsals, getFutsalById, updateFutsal, deleteFutsal } from "../controller/futsalController.js";

const router = express.Router()

router.post("/create", createFutsal);
router.get("/", displayFutsals);
router.get("/:id", getFutsalById);
router.put("/:id", updateFutsal);
router.delete("/:id", deleteFutsal);

export default router
