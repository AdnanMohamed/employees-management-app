import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DepartmentsTable = ({ departments, onEdit, onDelete }) => {
  const columns = [
    { field: "name", headerName: "Name", flex: 1, editable: false },
    {
      field: "establishedAt",
      headerName: "Established At",
      flex: 1,
      editable: false,
    },
    { field: "email", headerName: "Email", flex: 1, editable: false },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.id)} color="secondary">
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
        rows={departments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </div>
  );
};

export default DepartmentsTable;
