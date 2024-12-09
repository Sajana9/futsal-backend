import express from "express"
import { createFutsal, displayFutsal } from "../controller/futsalController.js";

const router = express.Router()

//Route 1: Create a futsal
router.post('/futsal', createFutsal)

//Route 2: Display all futsal
router.get('/futsal', displayFutsal)

export default router
