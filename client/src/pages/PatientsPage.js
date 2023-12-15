import React, { useState, useEffect } from "react";
import axios from "../api/axiosSetup"; // Adjust the path as per your project structure
import { Container, Typography, Button, Snackbar, Alert } from "@mui/material";
import PatientForm from "../components/PatientForm"; // To be implemented
import PatientsTable from "../components/PatientsTable"; // To be implemented
import ConfirmationModal from "../components/ConfirmationModal"; // Assuming similar to DepartmentsPage

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [patientToDeleteId, setPatientToDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch patients",
        severity: "error",
      });
    }
  };

  const handleAddPatient = () => {
    setCurrentPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setShowForm(true);
  };

  const handleDeleteClick = (patientId) => {
    setPatientToDeleteId(patientId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/patients/${patientToDeleteId}`);
      fetchPatients();
      setSnackbar({
        open: true,
        message: "Patient deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete patient",
        severity: "error",
      });
    }
    setDeleteModalOpen(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchPatients();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Manage Patients
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddPatient}>
        Add Patient
      </Button>
      <PatientsTable
        patients={patients}
        onEdit={handleEditPatient}
        onDelete={handleDeleteClick}
      />
      {showForm && (
        <PatientForm
          open={showForm}
          onClose={handleFormClose}
          patient={currentPatient}
          refreshPatients={fetchPatients}
        />
      )}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this patient?"
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

export default PatientsPage;
