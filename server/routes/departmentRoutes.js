const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// GET all departments
router.get("/", departmentController.getAllDepartments);

// GET a specific department by ID
router.get("/:id", departmentController.getDepartment);

// POST a new department
router.post("/", departmentController.createDepartment);

// PUT update a department by ID
router.put("/:id", departmentController.updateDepartment);

// DELETE a department by ID
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
