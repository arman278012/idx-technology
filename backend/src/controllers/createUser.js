const User = require('../model/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
    try {
        const { name, emailId, phoneNumber, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create new user
        const newUser = new User({ name, emailId, phoneNumber, password });
        await newUser.save();

        console.log(newUser);

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.emailId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            userId: newUser._id,
            name: newUser.name,
            emailId: newUser.emailId
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


// Login Controller
exports.login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        console.log("Login Attempt:", { emailId, password });

        if (!emailId || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ emailId });

        if (!user) {
            console.log("User not found for email:", emailId);
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.emailId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            name: user.name,
            emailId: user.emailId,
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};