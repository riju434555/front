import { Password } from "@mui/icons-material";
import React, { useMemo } from "react";
import * as Yup from "yup";

// for registration Type ==================================
export function alllValidarionSchema() {
  return Yup.string().required("Please select a user type");
}

// for email validation =============================================
export const useemailValidationSchema = () => {
  return Yup.string().email("Invalid Email Address").required("Required");
};

// for password validateion =======================================
export function alllallValidarionSchema() {
  return Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Please enter your new password")
    .matches(
      /^(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one uppercase letter and one symbol"
    );
}

// for confirm password validation =========================================
export function useConfirmPassValidationSchema() {
  return Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6, "Confirm password must be at least 6 characters")
    .max(20, "Confirm password must be at most 20 characters")
    .required("Please enter your confirm password");
}

// for captcha validation ================================================
export function useCaptchaSchema() {
  return Yup.boolean().required("Please confirm Captch").required("Required");
}

// for first name validation =========================================
export function usefirstNameSchema() {
  return Yup.string().required("Please Enter valid Name");
}

// for last name validation ==========================================
export function uselastNameSchema() {
  return Yup.string("Enter valid last name").required("Required");
}

// for mobile number validation =============================
export function usemobileSchema() {
  return Yup.number().required("Please Enter valid Mobile Number");
}

// for whats app number validation ==============================
export function usewhatsappSchema() {
  return Yup.number().required("Please Enter valid Whats App number");
}

// for address validation ===============================
export function useaddressSchema() {
  return Yup.string("Enter valid Address").required("Required");
}

// for city validation ===========================
export function usecitySchema() {
  return Yup.string("Enter valid City").required("Required");
}

// for state validation ===================================
export function usestateSchema() {
  return Yup.string("Enter valid State").required("Required");
}
// for current status validation ===================================
export function usecurrentStatusSchema() {
  return Yup.string("Enter valid State").required(
    "Please enter current status"
  );
}

// for coountry validarion ==================================
export function usecountrySchema() {
  return Yup.string("Enter valid Country Name").required("Required");
}

// for zip code validation  ==================================
export function usezipSchema() {
  return Yup.number("Enter valid zip code")
    .required("Required")
    .required("Required");
}
// for company name validation =========================================
export function usecompanyNameSchema() {
  return Yup.string().required("Please Enter valid Company Name");
}

// for shop name validation =========================================
export function useshoptNameSchema() {
  return Yup.string().required("Please Enter valid Shop Name");
}
// for full name validation =========================================
export function usefullNameSchema() {
  return Yup.string().required("Please Enter valid Name");
}
// for uder role validation =========================================
export function useuserRollSchema() {
  return Yup.string().required("Please select User Role");
}
// for project validation =========================================
export function useprojectSchema() {
  return Yup.string().required("Please Enter valid Project Name");
}
// for chat type validation =========================================
export function usechatTypeSchema() {
  return Yup.string().required("Please Enter valid chat type");
}
// for chat direction validation =========================================
export function usedateAndTimeSchema() {
  return Yup.string().required("Please Enter valid Date and time");
}

// for next followup validation =========================================
export function usechatDirectonSchema() {
  return Yup.string().required("Please Enter valid direction");
}

// for chat direction validation =========================================
export function usemessageSchema() {
  return Yup.string().required("Please Enter valid Message");
}
// BusinessAreaDomain validation =========================================
export function usebusinessAreaDomainSchema() {
  return Yup.string().required("Please Enter valid Message");
}
