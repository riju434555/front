


import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Functional component for login form
export default function LoginForm() {
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
    // Retrieve the token from sessionStorage
    const token = JSON.parse(sessionStorage.getItem("token"));

    // Set up the headers with the token
    const headers = {
      Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
      "Content-Type": "application/json", // Assuming the content type is JSON
    };

    try {
      // Make a POST request to the login endpoint with headers and form data
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/user/login2`,
        values,
        { headers: headers }
      );

      // Check the response status and handle accordingly
      if (res.data.status === -1) {
        console.log(res.data);
        alert("Something went wrong");
      } else if (res.data.status === 1) {
        console.log(res.data);
        // Store new tokens and user ID in sessionStorage
        sessionStorage.setItem("token2", JSON.stringify(res.data.token));
        sessionStorage.setItem("UserID", JSON.stringify(res.data.user.ID));

        // Navigate to the customers page
        navigate("/authorize/customers");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      alert("An error occurred");
      console.log(error);
    }
  };

  return (
    <>
      <Stack
        sx={{
          // Container styling for the login form
          width: "40%",
          padding: "3rem",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "45px",
          marginLeft: "15rem",
          display: "flex",
          alignItems: "center",

          // Responsive styling for smaller screens
          "@media (max-width: 1050px)": {
            width: "100%",
          },
        }}
      >
        <Typography variant="h4">Login</Typography>

        {/* Email address input field */}
        <TextField
          label="Enter Email"
          name="EmailAddress"
          value={values.EmailAddress || ""}
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
    </>
  );
}

//=======================================================

// import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// // import { Link } from "react-router";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function LoginForm() {
//   const [values, setValues] = useState([]);
//   const navigate = useNavigate();

//   const loginTextHandle = (e) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };
//   const loginSubmit = async () => {
//     // console.log(values);
//     const token = JSON.parse(sessionStorage.getItem("token"));
//     // Set up the headers with the token
//     const headers = {
//       Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
//       "Content-Type": "application/json", // Assuming the content type is JSON
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/v1/user/login2",
//         values,
//         { headers: headers }
//       );
//       if (res.data.status == -1) {
//         console.log(res.data);
//         alert("something wrong");
//       }
//       if (res.data.status == 1) {
//         console.log(res.data);
//         sessionStorage.setItem("token2", JSON.stringify(res.data.token));
//         sessionStorage.setItem("UserID", JSON.stringify(res.data.user.ID));

//         navigate("/authorize/customers");
//       }
//     } catch (error) {
//       alert("something wrong1");
//       console.log(error);
//     }

//     // if (res.data.status == 1) {
//     //   // localStorage.setItem("token", JSON.stringify(res.data.token));
//     //   // navigate("/authorize/customers");
//     // } else {
//     //   alert("Invalid credentials");
//     // }
//   };
//   return (
//     <>
//       <Stack
//         sx={{
//           // height: "60%",
//           width: "40%",

//           padding: "3rem",
//           gap: "1rem",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#fff",
//           borderRadius: "45px",
//           marginLeft: "15rem",
//           display: "flex",
//           alignItems: "center",

//           "@media (max-width: 1050px)": {
//             width: "100%",
//           },
//         }}
//       >
//         <Typography variant="h4">Login</Typography>

//         <TextField
//           label="Enter Email"
//           name="EmailAddress"
//           value={values.EmailAddress}
//           onChange={loginTextHandle}
//           fullWidth
//         />
//         <TextField
//           label="Password"
//           type="password"
//           name="Password"
//           value={values.Password}
//           onChange={loginTextHandle}
//           fullWidth
//         />
//         {/* <Link to="/authorize/customers" style={{ width: "100%" }}> */}
//         <Button
//           variant="contained"
//           size="large"
//           onClick={loginSubmit}
//           fullWidth
//         >
//           Log In
//         </Button>
//         {/* </Link> */}
//       </Stack>
//     </>
//   );
// }

// ==================================================================
