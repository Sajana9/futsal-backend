import Futsal from "../model/futsalSchema.js";

//Route 1: Create a futsal
export const createFutsal = async (req, res) => {
    const { name, address, email, phone, desc, disclaimer } = req.body;
    try {
        const futsal = await Futsal.create({ name, address, email, phone, desc, disclaimer })
        return res.status(200).json({ "msg": "Futsal Created Successfully", futsal })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
}