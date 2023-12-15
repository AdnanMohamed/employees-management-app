const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();
// GET /patients
router.get("/", patientController.getAllPatients);

// GET /patients/:id
router.get("/:id", patientController.getPatient);

// POST /patients
router.post("/", patientController.createPatient);

// PUT /patients/:id
router.put("/:id", patientController.updatePatient);

// DELETE /patients/:id
router.delete("/:id", patientController.deletePatient);

module.exports = router;
