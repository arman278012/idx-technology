const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connection = require('./src/config/connection');
const userRoutes = require('./src/routers/authRouters'); // corrected path
const notesRoutes = require('./src/routers/noteRouter')

dotenv.config();

// Connect to MongoDB
connection().catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// Middleware
app.use(express.json());

app.use(cors({
    origin: "*", 
    credentials: true,
}));

app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
