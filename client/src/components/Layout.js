// Layout.js
import React from "react";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  console.log("Layout");
  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" style={{ paddingTop: "20px" }}>
        <Grid item xs={12} lg={10} xl={8}>
          <div style={{ padding: "0 30px" }}>
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
