import React, { useState, useEffect } from "react";
import axios from "../api/axiosSetup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const DepartmentForm = ({ open, onClose, department, refreshDepartments }) => {
  const [formData, setFormData] = useState({
    name: "",
    establishedAt: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        establishedAt: department.establishedAt.split("T")[0], // Format the date for the input field
        email: department.email,
      });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.establishedAt)
      tempErrors.establishedAt = "Establishment date is required";
    if (!formData.email) tempErrors.email = "Email is required";
    // Add more validation as needed
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      department ? console.log(`About to update`) : console.log(`About to add`);
      if (department) {
        await axios.put(`/api/departments/${department._id}`, formData);
        alert("Department updated successfully!");
      } else {
        await axios.post("/api/departments", formData);
        alert("Department added successfully!");
      }
      refreshDepartments();
      onClose();
    } catch (error) {
      alert(
        `Error: ${error.response.data.message || "Failed to update department"}`
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {department ? "Edit Department" : "Add Department"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Established At"
          name="establishedAt"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.establishedAt}
          onChange={handleChange}
          error={!!errors.establishedAt}
          helperText={errors.establishedAt}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {department ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentForm;
