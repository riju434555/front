import logo from "./logo.svg";
import "./App.css";
import { Box, Button, Typography } from "@mui/material";

import LoginPage from "./page/login/LoginPage";
import RegistrationPage from "./page/registrationPage/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import AddCustomerPage from "./page/addCustomerPage/AddCustomerPage";
import AddProjectPage from "./page/addProjectPage/AddProjectPage";
import Authorize from "./layout/Authorize";
import AuthPage from "./page/authPage/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/authorize" element={<Authorize />}>
        <Route path="customers" element={<AddCustomerPage />} />
        <Route path="projects" element={<AddProjectPage />} />
      </Route>
    </Routes>
  );
}
{
}

export default App;
