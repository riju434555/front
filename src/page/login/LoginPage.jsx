import React from "react";
import LoginForm from "./component/LoginForm";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          background: "#444",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "50rem",
            flex: 1,
            // position: "relative",
            backgroundColor: "#444",
            // overflow: "hidden",
            // display: "flex",
            // justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: "150%",
              height: "150%",
              backgroundColor: "#fff",
              transform: "skew(-15deg, -15deg)",
              marginRight: "4rem",
              position: "relative",
              right: "28rem",
              top: "-10rem",
              zIndex: 10,

              // left: "-50rem",
              // top: "-10rem",

              // "@media (min-width: 720px)": {
              //   left: "-70rem",
              //   top: "-10rem",
              // },
              // "@media (min-width: 1000px)": {
              //   left: "-60rem",
              //   top: "-10rem",
              // },
              // "@media (min-width: 1350px)": {
              //   left: "-50rem",
              //   top: "-10rem",
              // },
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            backgroundColor: "#444",
            zIndex: 9,
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: " #444",
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            flex: 1,
            zIndex: 30,
          }}
        >
          <img
            width="50%"
            height="40%"
            src="img/logo.png"
            sx={{ zIndex: 99, marginRight: "5rem" }}
          />
          <Typography sx={{ textAlign: "center" }} variant="h2" gutterBottom>
            PIDMS system
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
            Looking for an account?
          </Typography>
          <Link to="/registration">
            <Button variant="contained" size="large">
              Register
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 2,
            zIndex: 30,
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </>
  );
}
