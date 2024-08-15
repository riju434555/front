import React, { useMemo } from "react";
import * as Yup from "yup";
import {
  useuserRollSchema,
  useprojectSchema,
  usechatTypeSchema,
  usedateAndTimeSchema,
  usechatDirectonSchema,
  usemessageSchema,
  usecurrentStatusSchema,
} from "./useallValidarionSchema";

export default function useaddNewCommunication() {
  const userRollSchema = useuserRollSchema();
  const projectSchema = useprojectSchema();
  const chatTypeSchema = usechatTypeSchema();
  const dateAndTimeSchema = usedateAndTimeSchema();
  const chatDirectonSchema = usechatDirectonSchema();
  const messageSchema = usemessageSchema();
  const currentStatusSchema = usecurrentStatusSchema();

  return Yup.object().shape({
    userRole: useuserRollSchema(),
    project: projectSchema,
    chatType: chatTypeSchema,
    // chatDirecton: chatDirectonSchema,
    // dateAndTime: dateAndTimeSchema,
    message: messageSchema,
    currentStatus: currentStatusSchema,
  });
}
