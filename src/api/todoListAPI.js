import axios from "axios";

import { USER_URL } from "../constants/url";

const jwt = localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${jwt}`,
};

export const getAllTodoLists = async () => {
  return await axios.get(`${USER_URL}/${userId}/todos/all`, { headers });
};

export const getTodoListById = async (todoListId) => {
  return await axios.get(`${USER_URL}/${userId}todos/${todoListId}`, {
    headers,
  });
};

export const addNewTodoList = async (payload) => {
  return await axios.post(`${USER_URL}/${userId}/todos`, payload, { headers });
};
