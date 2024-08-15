import React from "react";
import NavComp from "./NavComp/NavComp";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Authorize() {
  return (
    <div>
      <NavComp />

      <Outlet />
      <Box
        sx={{
          height: "10rem",
          width: "100%",
          backgroundColor: "#222",
          marginTop: "6rem",
        }}
      ></Box>
    </div>
  );
}
