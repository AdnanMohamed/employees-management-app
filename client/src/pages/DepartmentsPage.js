import React, { useState, useEffect } from "react";
import axios from "../api/axiosSetup";
import { Container, Typography, Button } from "@mui/material";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentsTable from "../components/DepartmentsTable";
import ConfirmationModal from "../components/ConfirmationModal";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [departmentToDeleteId, setDepartmentToDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddDepartment = () => {
    setCurrentDepartment(null);
    setShowForm(true);
  };

  const handleEditDepartment = (department) => {
    setCurrentDepartment(department);
    setShowForm(true);
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`/api/departments/${departmentId}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleDeleteClick = (departmentId) => {
    setDepartmentToDeleteId(departmentId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteDepartment(departmentToDeleteId);
    setDeleteModalOpen(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchDepartments();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Manage Departments
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddDepartment}>
        Add Department
      </Button>
      <DepartmentsTable
        departments={departments}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteClick}
      />
      {showForm && (
        <DepartmentForm
          open={showForm}
          onClose={handleFormClose}
          department={currentDepartment}
          refreshDepartments={fetchDepartments}
        />
      )}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this department?"
      />
    </Container>
  );
};

export default DepartmentsPage;
