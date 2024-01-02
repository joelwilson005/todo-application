import axios from "axios";

import {ROOT_URL, USER_URL} from "../constants/url";

const jwt = localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");

const contentTypeHeader = {
    "Content-Type": "application/json",
};

const headerWithToken = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
};

export const signInUser = async (payload) => {
    return await axios.post(`${USER_URL}/login`, payload, contentTypeHeader);
};

export const signUpUser = async (payload) => {
    return await axios.post(`${USER_URL}/register`, payload, contentTypeHeader);
};

export const getUser = async () => {
    return await axios.get(`${USER_URL}/${userId}`, {headers: headerWithToken});
};

export const updateUser = async (payload) => {
    return await axios.put(`${USER_URL}/${userId}`, payload, {
        headers: headerWithToken,
    });
};

export const checkUsernameAndEmailAvailability = async (payload) => {
    return await axios.post(
        `${USER_URL}/checkusernameandemail`,
        payload,
        contentTypeHeader
    );
};

export const requestResetPasswordToken = async (payload) => {
    return await axios.post(`${ROOT_URL}/forgot`, payload, contentTypeHeader);
};

export const updatePasswordWithToken = async (payload) => {
    payload.emailAddress = localStorage.getItem("emailAddress");
    delete payload.confirmPassword;

    return await axios.post(
        `${ROOT_URL}/reset_password`,
        payload,
        contentTypeHeader
    );
};

export const deleteAccount = async () => {


    return await axios.delete(`${USER_URL}/${userId}`, {
        headers: headerWithToken,
    });
};
