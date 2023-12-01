import axios from "axios";

import { USER_URL, ROOT_URL_DEV } from "../constants/url";

const contentTypeHeader = {
  "Content-Type": "application/json",
};

const tokenHeader = {
  Authorization: "Bearer ",
};

export const signInUser = async (payload) => {
  return await axios.post(`${USER_URL}/login`, payload, contentTypeHeader);
};

export const signUpUser = async (payload) => {
  return await axios.post(`${USER_URL}/register`, payload, contentTypeHeader);
};

export const checkUsernameAndEmailAvailability = async (payload) => {
  return await axios.post(
    `${USER_URL}/checkusernameandemail`,
    payload,
    contentTypeHeader
  );
};

export const requestResetPasswordToken = async (payload) => {
  return await axios.post(`${ROOT_URL_DEV}/forgot`, payload, contentTypeHeader);
};

export const updatePasswordWithToken = async (payload) => {
  payload.emailAddress = localStorage.getItem("emailAddress");
  delete payload.confirmPassword;

  return await axios.post(
    `${ROOT_URL_DEV}/reset_password`,
    payload,
    contentTypeHeader
  );
};
