import axios from "axios";

import {USER_URL} from "../constants/url";

const jwt = localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
};

export const createAction = async (payload) => {
    const response = await axios.post(
        `${USER_URL}/${userId}/todos/${payload.todoListId}/actions`,
        payload.action,
        {
            headers,
        }
    );

    return response.data;
};

export const updateAction = async (payload) => {
    return await axios.put(
        `${USER_URL}/${userId}/todos/${payload.todoListId}/actions/${payload.id}`,
        payload,
        {
            headers,
        }
    );
};

export const deleteAction = async (payload) => {
    return await axios.delete(
        `${USER_URL}/${userId}/todos/${payload.todoListId}/actions/${payload.id}`,
        {
            headers,
        }
    );
};
