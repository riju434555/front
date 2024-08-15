import React, { useMemo } from "react";
import * as Yup from "yup";
import {
  usefirstNameSchema,
  usecompanyNameSchema,
  uselastNameSchema,
  usewhatsappSchema,
  usemobileSchema,
  useemailValidationSchema,
  useaddressSchema,
  usestateSchema,
  usecitySchema,
  usezipSchema,
  useshoptNameSchema,
  usefullNameSchema,
  usebusinessAreaDomainSchema,
} from "./useallValidarionSchema";

export default function useaddNewCustomer() {
  const firstNameSchema = usefirstNameSchema();
  const companyNameSchema = usecompanyNameSchema();
  const lastNameSchema = uselastNameSchema();
  const whatsappSchema = usewhatsappSchema();
  const mobileSchema = usemobileSchema();
  const emailValidationSchema = useemailValidationSchema();
  const addressSchema = useaddressSchema();
  const stateSchema = usestateSchema();
  const citySchema = usecitySchema();
  const zipSchema = usezipSchema();
  const shoptNameSchema = useshoptNameSchema();
  const fullNameSchema = usefullNameSchema();
  const businessAreaDomainSchema = usebusinessAreaDomainSchema();

  return Yup.object().shape({
    FirstName: firstNameSchema,
    LastName: lastNameSchema,
    CompanyName: companyNameSchema,
    CompanyAddress: addressSchema,
    Location: stateSchema,
    ZipPinEIRCode: zipSchema,
    BusinessAreaDomain: businessAreaDomainSchema,
  });
}
