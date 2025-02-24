import Futsal from "../model/futsalSchema.js";

// Route 1: Create a futsal
export const createFutsal = async (req, res) => {
    const { name, address, email, phone, desc, disclaimer } = req.body;
    try {
        const futsal = await Futsal.create({ name, address, email, phone, desc, disclaimer });
        return res.status(201).json({ msg: "Futsal Created Successfully", futsal });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// Route 2: Display all futsals
export const displayFutsals = async (req, res) => {
    try {
        const futsals = await Futsal.find({});
        return res.status(200).json(futsals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// Route 3: Display a single futsal by ID
export const getFutsalById = async (req, res) => {
    const { id } = req.params;
    try {
        const futsal = await Futsal.findById(id);
        if (!futsal) {
            return res.status(404).json({ msg: "Futsal not found" });
        }
        return res.status(200).json(futsal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// Route 4: Update a futsal by ID
export const updateFutsal = async (req, res) => {
    const { id } = req.params;
    const { name, address, email, phone, desc, disclaimer } = req.body;
    try {
        const futsal = await Futsal.findByIdAndUpdate(
            id,
            { name, address, email, phone, desc, disclaimer },
            { new: true, runValidators: true }
        );
        if (!futsal) {
            return res.status(404).json({ msg: "Futsal not found" });
        }
        return res.status(200).json({ msg: "Futsal Updated Successfully", futsal });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// Route 5: Delete a futsal by ID
export const deleteFutsal = async (req, res) => {
    const { id } = req.params;
    try {
        const futsal = await Futsal.findByIdAndDelete(id);
        if (!futsal) {
            return res.status(404).json({ msg: "Futsal not found" });
        }
        return res.status(200).json({ msg: "Futsal Deleted Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};
