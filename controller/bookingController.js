import Booking from "../model/bookSchema.js";
import Futsal from "../model/futsalSchema.js";

// Book a Futsal
export const bookFutsal = async (req, res) => {
    const { futsalId, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    try {
        // Check if futsal exists
        const futsal = await Futsal.findById(futsalId);
        if (!futsal) {
            return res.status(404).json({ msg: "Futsal not found" });
        }

        // Check availability
        const existingBooking = await Booking.findOne({
            futsal: futsalId,
            date,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ msg: "Time slot already booked" });
        }

        // Create Booking
        const booking = await Booking.create({
            user: userId,
            futsal: futsalId,
            date,
            startTime,
            endTime
        });

        res.status(201).json({ msg: "Futsal booked successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.find({ user: userId }).populate("futsal", "name address");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized to cancel this booking" });
        }

        booking.status = "Cancelled";
        await booking.save();

        res.status(200).json({ msg: "Booking cancelled successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
