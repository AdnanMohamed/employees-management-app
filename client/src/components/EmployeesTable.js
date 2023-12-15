import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeesTable = ({ employees, onEdit, onDelete }) => {
  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1, minWidth: 100 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 2,
      minWidth: 150,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: "phones", headerName: "Phones", flex: 1, minWidth: 100 },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => `${params.row.department.name}`,
    },
    {
      field: "numPatients",
      headerName: "Number of Patients",
      flex: 1,
      minWidth: 150,
      type: "number",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 100,
    },
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 100 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) => params.value.split("T")[0], // Formats the date to show only the date part
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row._id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={employees}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </div>
  );
};

export default EmployeesTable;
