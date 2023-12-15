const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  establishedAt: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Department", departmentSchema);
