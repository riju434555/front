import React from "react";
import * as Yup from "yup";
import {
  useprojectNameSchema,
  useprojectDetailsSchema,
  useprojectDeadlineSchema,
  useprojectTypeSchema,
  useprojectStatusSchema,
  useprojectSponsorSchema,
  useprojectFrontStackSchema,
  useprojectBackStackSchema,
  useprojectServerSchema,
  useprojectTechnologySchema,
} from "./useprojectAllValidation";

export function useprojectValidation() {
  const projectNameSchema = useprojectNameSchema();
  const projectDetailsSchema = useprojectDetailsSchema();
  const projectDeadlineSchema = useprojectDeadlineSchema();
  const projectTypeSchema = useprojectTypeSchema();
  const projectStatusSchema = useprojectStatusSchema();
  const projectTechnologySchema = useprojectTechnologySchema();
  const projectBackStackSchema = useprojectBackStackSchema();
  const projectServerSchema = useprojectServerSchema();
  const projectFrontStackSchema = useprojectFrontStackSchema();
  const projectSponsorSchema = useprojectSponsorSchema();

  const validationSchema = Yup.object().shape({
    projectName: projectNameSchema,
    projectDetails: projectDetailsSchema,
    projectDeadline: projectDeadlineSchema,
    projectType: projectTypeSchema,
    projectStatus: projectStatusSchema,
    projectTechnology: projectTechnologySchema,
    projectBackStack: projectBackStackSchema,
    projectServer: projectServerSchema,
    projectFrontStack: projectFrontStackSchema,
    projectSponsor: projectSponsorSchema,
  });

  return validationSchema;
}
