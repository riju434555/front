// ==================================================

import React, { useState } from "react";
import NavComp from "../../layout/NavComp/NavComp";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import ProjectList from "./component/ProjectList";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import NewProjectFormP from "./NewProjectFormP";
import JsonToExcelConverter from "./component/JsonToExcelConverter";

export default function AddProjectPage() {
  // State variables
  const [selectSearchType, setSelectSearchType] = useState("ProjectName");
  const [searchText, setSearchText] = useState("");
  const [fetchProjectsAfterAdd, setFetchProjectsAfterAdd] = useState("");
  const navigate = useNavigate();

  // Token retrieval from session storage
  const token2 = JSON.parse(sessionStorage.getItem("token2"));

  // Redirect to home if token is not present
  React.useEffect(() => {
    if (!token2) {
      navigate("/");
    }
  }, [token2, navigate]);

  // Function to trigger a refresh of the project list after adding a new project
  const fetchProjectFn = () => {
    setFetchProjectsAfterAdd(Date.now()); // Triggers re-render by updating state
  };

  return (
    <div>
      <Stack sx={{ padding: "1rem" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Search Type Selection */}
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel id="demo-simple-select-label">
              Select search type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectSearchType}
              label="Select search type"
              onChange={(e) => setSelectSearchType(e.target.value)}
            >
              <MenuItem value="ProjectName">Project Name</MenuItem>
              <MenuItem value="FirstName">Customer Name</MenuItem>
              <MenuItem value="ProjectStatusName">Project Status</MenuItem>
            </Select>
          </FormControl>

          {/* Search Text Field */}
          <TextField
            fullWidth
            label="Enter your text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            sx={{
              width: "60%",
              borderRadius: "40px",
              backgroundColor: "#fff",
              outline: "none",
              border: "none",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid black",
                  outline: "none",
                  borderRadius: "25px",
                },
                "&:hover fieldset": {
                  outline: "none",
                  borderRadius: "25px",
                  border: "1px solid black",
                },
                "&.Mui-focused fieldset": {
                  outline: "none",
                  borderRadius: "25px",
                  border: "1px solid black",
                },
              },
            }}
          />

          {/* New Project Form Component */}
          <NewProjectFormP fetchProjectFn={fetchProjectFn} />
        </Box>

        {/* Project List Component */}
        <Box sx={{ marginTop: "1.5rem" }}>
          <ProjectList
            searchText={searchText}
            selectSearchType={selectSearchType}
            fetchProjectsAfterAdd={fetchProjectsAfterAdd}
          />
        </Box>
      </Stack>
    </div>
  );
}
