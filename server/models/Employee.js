const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    match: /^EMP-\d{4}$/,
  },
  dateOfBirth: { type: Date, required: true },
  phones: [{ type: String, match: /^\d{3}-\d{3}-\d{4}$/ }], // Assuming American phone format
  yearsOfExperience: Number,
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  specialization: String,
  department: { type: Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Employee", employeeSchema);
