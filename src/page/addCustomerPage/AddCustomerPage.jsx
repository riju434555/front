import React, { useState } from "react";
import NavComp from "../../layout/NavComp/NavComp";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import NewCustomerForm from "./component/NewCustomerForm";
import CustomerList from "./component/CustomerList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCustomerPage() {
  // State for storing the list of customers
  const [customerList, setCustomerList] = React.useState([]);

  // State for storing the search query
  const [companySearch, setCompanySearch] = useState("");

  // State for triggering a fetch after editing a customer
  const [fetchAfterEdit, setFetchAfterEdit] = React.useState("");

  // Function to trigger a fetch operation after editing a customer
  const fetchAfterEditFn = () => {
    setFetchAfterEdit(Date.now()); // Update state to trigger a re-fetch
  };

  // Hook for navigation ========================
  const navigate = useNavigate();

  // Get the token from session storage
  const token2 = JSON.parse(sessionStorage.getItem("token2"));

  // Function to fetch customer data from the server
  const fetchCustomer = async () => {
    const headers = {
      Authorization: `Bearer ${token2}`, // Authorization header with Bearer token
      "Content-Type": "application/json", // Specify content type as JSON
    };

    try {
      // Make a GET request to fetch customer details
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/customer/details`,
        {
          headers: headers,
        }
      );
      setCustomerList(res.data); // Update state with the fetched customer list
    } catch (err) {
      // Handle errors
      if (err.response.data.code === -2) {
        // Redirect to the home page if token is invalid
        navigate("/");
      }
    }
  };

  // Effect to run when component mounts or `fetchAfterEdit` changes ===========================
  React.useEffect(() => {
    if (!token2) {
      // Redirect to the home page if no token is found
      navigate("/");
    } else {
      // Fetch customer data when component mounts or `fetchAfterEdit` changes
      fetchCustomer();
    }
  }, [fetchAfterEdit, navigate, token2]);

  return (
    <div>
      <Stack sx={{ padding: "1rem" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingLeft: "5rem",
            borderRadius: "20px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            label="Enter Company Name"
            onChange={(e) => setCompanySearch(e.target.value)} // Update search query
            value={companySearch} // Controlled component value
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
                  border: "1px solid black",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid black",
                },
              },
            }}
          />
          {/* Component to add a new customer */}
          <NewCustomerForm fetchCustomer={fetchCustomer} />
        </Box>
        <Box sx={{ minHeight: "100vh" }}>
          {/* Component to display the list of customers */}
          <CustomerList
            customerList={customerList}
            fetchCustomer={fetchCustomer}
            companySearch={companySearch}
            fetchAfterEditFn={fetchAfterEditFn}
            fetchAfterEdit={fetchAfterEdit}
          />
        </Box>
      </Stack>
    </div>
  );
}
