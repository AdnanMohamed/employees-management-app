import React, { useState, useEffect } from "react";
import axios from "../api/axiosSetup"; // Adjust the path as per your project structure
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EmployeeForm = ({ open, onClose, employee, refreshEmployees }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    phones: "",
    department: "",
    specialization: "",
    gender: "",
    dateOfBirth: "",
    specialization: "",
  });
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        // Handle errors appropriately
      }
    };

    fetchDepartments();

    if (employee) {
      setFormData({
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phones: employee.phones.join(", "), // Assuming phones is an array
        department: employee.department._id,
        specialization: employee.specialization,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth.split("T")[0],
        specialization: employee.specialization,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    // Add validation logic here
    // Example: if (!formData.firstName) tempErrors.firstName = 'First name is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = { ...formData, phones: formData.phones.split(", ") }; // Convert phones back to array
      if (employee) {
        await axios.put(`/api/employees/${employee._id}`, data);
        alert("Employee updated successfully!");
      } else {
        await axios.post("/api/employees", data);
        alert("Employee added successfully!");
      }
      refreshEmployees();
      onClose();
    } catch (error) {
      alert(
        `Error: ${error.response?.data?.message || "Failed to update employee"}`
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Employee ID"
          name="employeeId"
          fullWidth
          variant="outlined"
          value={formData.employeeId}
          onChange={handleChange}
          error={!!errors.employeeId}
          helperText={errors.employeeId}
        />
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          fullWidth
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          margin="dense"
          label="Specialization"
          name="specialization"
          fullWidth
          variant="outlined"
          value={formData.specialization}
          onChange={handleChange}
          error={!!errors.specialization}
          helperText={errors.specialization}
        />
        <TextField
          margin="dense"
          label="Phones"
          name="phones"
          fullWidth
          variant="outlined"
          value={formData.phones}
          onChange={handleChange}
          error={!!errors.phones}
          helperText={errors.phones}
        />
        {/* Add other fields such as Department, Specialization, etc. */}
        <FormControl component="fieldset" style={{ marginTop: "10px" }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          margin="dense"
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            name="department"
            value={formData.department}
            label="Department"
            onChange={handleChange}
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {employee ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
