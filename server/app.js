const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
connectDB();

const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const patientRoutes = require("./routes/patientRoutes");

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to Dentist Management System API");
});

// Use routes
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/patients", patientRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
