import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for authentication page
export default function AuthPage() {
  // State to manage form field values
  const [values, setValues] = useState({});

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handles input change and updates the state
  const loginTextHandle = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission
  const loginSubmit = async () => {
    console.log(process.env);

    try {
      // Log the current form values for debugging
      console.log(values);

      // Send a POST request to the login endpoint
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/user/login`,
        values
      );

      // Check if the response status indicates success
      if (res.data.status === 1) {
        // Store the token in sessionStorage
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        // Navigate to the login success page (or dashboard)
        navigate("/login");
      } else {
        // Show an alert if credentials are invalid
        alert("Invalid credentials");
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      console.error("Login failed", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the content vertically
        padding: "2rem", // Add padding for better spacing
      }}
    >
      <Stack sx={{ width: "30%", gap: "1rem", textAlign: "center" }}>
        <p>Prabhabi</p>
        <Typography variant="h4">Login</Typography>

        {/* User ID input field */}
        <TextField
          label="Enter UserId"
          name="UserId"
          value={values.UserId || ""}
          onChange={loginTextHandle}
          fullWidth
        />

        {/* Password input field */}
        <TextField
          label="Password"
          type="password"
          name="Password"
          value={values.Password || ""}
          onChange={loginTextHandle}
          fullWidth
        />

        {/* Login button */}
        <Button
          variant="contained"
          size="large"
          onClick={loginSubmit}
          fullWidth
        >
          Log In
        </Button>
      </Stack>
    </Box>
  );
}
