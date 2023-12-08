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

export const updateExistingTodoList = async (payload) => {
  return await axios.put(`${USER_URL}/${userId}/todos/${payload.id}`, payload, {
    headers,
  });
};

export const deleteTodoList = async (payload) => {
  return await axios.delete(`${USER_URL}/${userId}/todos/${payload.id}`, {
    headers,
  });
};
