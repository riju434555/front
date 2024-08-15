import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { values } from "lodash";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  // State to hold the list of designations/roles fetched from the API
  const [designations, setDesignations] = React.useState([]);
  // State for the selected designation (UserRoleID)

  const [designation, setDesignation] = React.useState("");
  // Ref to focus the element when the component mounts

  const descriptionElementRef = React.useRef(null);

  // State to manage form input values

  const [values, setValues] = useState({
    UserID: "",
    Password: "",
    FirstName: "",
    LastName: "",
    UserRoleID: "",
    EmailAddress: "",
  });

  // State to manage phone input data
  const [phone, setPhone] = useState({});

  // Hook for navigation
  const navigate = useNavigate();

  // Fetch designations on component mount
  React.useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }

    // Function to fetch user roles from API
    const designationFn = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/user/userRole`
      );
      setDesignations(res.data);
    };
    designationFn();
  }, []);

  // for imput value handeler =====================================
  const registrationHandeler = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // Handle phone input changes
  function handleOnChange(value, data, event, formattedValue) {
    // setPhone({ rawPhone: value.slice(data.dialCode.length) });
    setPhone({
      MobileNumberCCode: data.dialCode,
      MobileNumber: value.slice(data.dialCode.length),
    });
  }
  // for submitting registration form ============================
  const registrationSubmitHandeler = async () => {
    try {
      // Get the token from localStorage
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);

      // Set up the headers with the token
      const headers = {
        Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
        "Content-Type": "application/json", // Assuming the content type is JSON
      };

      // Assuming 'values' and 'phone' are defined somewhere in your component or context
      console.log({
        ...values,
        ...phone,
      });
      const res = await axios.post(
        "http://localhost:8080/v1/user/register",
        {
          ...values,
          ...phone,
        },
        { headers: headers }
      );

      // Log the response data
      if (res.status == -1) {
        navigate("/");
      }

      // Handle success, assuming you want to reset form values after successful registration
      // setValues is a function to update form values, make sure it's defined
      setValues({
        UserID: "",
        Password: "",
        FirstName: "",
        LastName: "",
        UserRoleID: "",
        EmailAddress: "",
      });
      alert("Registration successfull!!! please Login");
      setPhone("");

      // Optionally, show an alert or perform other actions upon successful registration
      // alert("User has been successfully registered");
    } catch (error) {
      // Handle error
      console.error("Error registering user:", error);
      // Optionally, you can display an error message to the user
      // alert("Failed to register user. Please try again.");
    }
  };

  return (
    <>
      {/* <Box
        sx={{
          height: "60%",
          width: "40%",

          borderRadius: "45px",
          marginLeft: "15rem",
          display: "flex",
          alignItems: "center",
        }}
      > */}
      <Stack
        sx={{
          // height: "60%",
          width: "35%",

          padding: "3rem",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "45px",
          marginLeft: "15rem",
          display: "flex",
          alignItems: "center",
          "@media (max-width: 1400px)": {
            width: "40%",
            gap: ".5rem",
          },

          "@media (max-width: 1050px)": {
            width: "100%",
          },
        }}
      >
        <Typography variant="h4">Registration</Typography>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ minWidth: "8rem" }}>
            User Type
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.UserRoleID}
              name="UserRoleID"
              label="User Role"
              onChange={registrationHandeler}
            >
              {designations.map((item, index) => (
                <MenuItem value={item.ID}>{item.UserRoleName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          sx={{ gap: "2rem", justifyContent: "space-between" }}
        >
          <TextField
            label="First Name"
            type="text"
            name="FirstName"
            value={values.FirstName}
            onChange={registrationHandeler}
          />
          <TextField
            label="Last Name"
            type="text"
            name="LastName"
            value={values.LastName}
            onChange={registrationHandeler}
          />
        </Stack>
        <TextField
          label="UserID"
          type="text"
          name="UserID"
          value={values.UserID}
          onChange={registrationHandeler}
          fullWidth
        />
        <PhoneInput
          country={"in"}
          enableSearch={true}
          onChange={handleOnChange}
          value={phone.phone}
          inputStyle={{
            height: "3.5rem",
            marginBottom: "15px",
            width: "100%",
          }}
        />
        <TextField
          label="email"
          type="email"
          fullWidth
          name="EmailAddress"
          value={values.EmailAddress}
          onChange={registrationHandeler}
        />

        <TextField
          label="Password"
          type="text"
          fullWidth
          name="Password"
          value={values.Password}
          onChange={registrationHandeler}
        />

        {/* <TextField
          label="Confirm Password"
          type="text"
          fullWidth
          name="confirmPass"
          value={values.confirmPass}
          onChange={registrationHandeler}
        /> */}
        <Button
          variant="contained"
          size="large"
          onClick={registrationSubmitHandeler}
          fullWidth
        >
          Register
        </Button>
      </Stack>
      {/* </Box> */}
    </>
  );
}
