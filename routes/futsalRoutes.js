import express from "express"
import { createFutsal } from "../controller/futsalController.js";

const router = express.Router()

//Route 1: Create a futsal
router.post('/futsal', createFutsal)

export default router
