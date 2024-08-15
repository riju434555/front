import { Password } from "@mui/icons-material";
import React, { useMemo } from "react";
import * as Yup from "yup";

// for project name ================================================
export function useprojectNameSchema() {
  return Yup.string("Enter valid Project Name").required("Required").min(3);
}

// for project details ================================================
export function useprojectDetailsSchema() {
  return Yup.string("Enter valid Project Details").required("Required").min(10);
}

// for deadline ================================================
export function useprojectDeadlineSchema() {
  return Yup.string("Enter deadline").required("Required").min(3);
}

// for project type ================================================
export function useprojectTypeSchema() {
  return Yup.string("Enter valid Project type").required("Required").min(3);
}

// for project status ================================================
export function useprojectStatusSchema() {
  return Yup.string("Enter valid Project Name").required("Required").min(3);
}

// for project sponsor ================================================
export function useprojectSponsorSchema() {
  return Yup.string("Enter valid Project Sponsor Name")
    .required("Required")
    .min(3);
}

// for project technology stack ================================================
export function useprojectTechnologySchema() {
  return Yup.string("Enter valid technology stack name")
    .required("Required")
    .min(3);
}

// for project front end stack ================================================
export function useprojectFrontStackSchema() {
  return Yup.string("Enter valid Project Name").required("Required").min(3);
}

// for project back end stack ================================================
export function useprojectBackStackSchema() {
  return Yup.string("Enter valid Backend stack Name")
    .required("Required")
    .min(3);
}

// for project server name================================================
export function useprojectServerSchema() {
  return Yup.string("Enter valid Server Name").required("Required").min(3);
}
