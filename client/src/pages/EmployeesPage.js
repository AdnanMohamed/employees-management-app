import React, { useState, useEffect } from "react";
import axios from "../api/axiosSetup"; // Adjust the path as per your project structure
import { Container, Typography, Button, Snackbar, Alert } from "@mui/material";
import EmployeeForm from "../components/EmployeeForm"; // To be implemented
import EmployeesTable from "../components/EmployeesTable"; // To be implemented
import ConfirmationModal from "../components/ConfirmationModal"; // Assuming similar to DepartmentsPage

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch employees",
        severity: "error",
      });
    }
  };

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (employeeId) => {
    console.log(`Delete employee with ID ${employeeId}`);
    setEmployeeToDeleteId(employeeId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/employees/${employeeToDeleteId}`);
      fetchEmployees();
      setSnackbar({
        open: true,
        message: "Employee deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete employee",
        severity: "error",
      });
    }
    setDeleteModalOpen(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchEmployees();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Manage Employees
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddEmployee}>
        Add Employee
      </Button>
      <EmployeesTable
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteClick}
      />
      {showForm && (
        <EmployeeForm
          open={showForm}
          onClose={handleFormClose}
          employee={currentEmployee}
          refreshEmployees={fetchEmployees}
        />
      )}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this employee?"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeesPage;
