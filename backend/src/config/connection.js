const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
    try {
        // Log the MongoDB URI to verify it's correct (only in dev)
        if (process.env.NODE_ENV === "development") {
            console.log("MongoDB URI:", process.env.MONGOSHURL);
        }

        const conn = await mongoose.connect(process.env.MONGOSHURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true // Ensure SSL is enabled
        });

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
};

module.exports = connection;
