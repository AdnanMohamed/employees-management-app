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
  Chip,
} from "@mui/material";

const PatientForm = ({ open, onClose, patient, refreshPatients }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    employees: [],
  });
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();

    if (patient) {
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        gender: patient.gender,
        employees: patient.employees.map((emp) => emp._id),
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (event) => {
    setFormData({ ...formData, employees: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    // Add more validation as needed
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (patient) {
        await axios.put(`/api/patients/${patient._id}`, formData);
        alert("Patient updated successfully!");
      } else {
        await axios.post("/api/patients", formData);
        alert("Patient added successfully!");
      }
      refreshPatients();
      onClose();
    } catch (error) {
      alert(
        `Error: ${error.response?.data?.message || "Failed to update patient"}`
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{patient ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent>
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
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
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
        <FormControl fullWidth margin="dense">
          <InputLabel id="employee-select-label">
            Assigned Employee(s)
          </InputLabel>
          <Select
            labelId="employee-select-label"
            id="employees"
            multiple
            value={formData.employees}
            onChange={handleEmployeeChange}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => {
                  const employee = employees.find((emp) => emp._id === value);
                  return (
                    <Chip
                      key={value}
                      label={`${employee?.firstName} ${employee?.lastName}`}
                    />
                  );
                })}
              </div>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
          >
            {employees.map((emp) => (
              <MenuItem key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
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
          {patient ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;
