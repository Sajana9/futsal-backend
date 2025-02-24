import User from "../model/authSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config();
// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            msg: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            msg: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get User Profile (protected route)
export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
};
