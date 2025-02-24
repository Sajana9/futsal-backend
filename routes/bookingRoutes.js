import express from "express";
import { bookFutsal, getUserBookings, cancelBooking } from "../controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, bookFutsal);
router.get("/", protect, getUserBookings);
router.delete("/:id", protect, cancelBooking);

export default router;
