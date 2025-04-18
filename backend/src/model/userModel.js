const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.emailId }, // ✅ FIXED
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};


const User = mongoose.model("User", userSchema);

module.exports = User;
