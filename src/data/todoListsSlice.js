import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodoListById, getAllTodoLists } from "../api/todoListAPI";

const initialState = {
  todoLists: [],
  status: "idle",
  error: null,
};

export const fetchAllTodoLists = createAsyncThunk(
  "todoLists/fetchAllTodoLists",
  async () => {
    const response = await getAllTodoLists();

    return response.data;
  }
);

const fetchTodoListById = createAsyncThunk(
  "todoLists/fetchTodoListById",
  async (todoListId) => {
    const response = await getTodoListById(todoListId);

    return response.data;
  }
);

const todoListSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAllTodoLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoLists = action.payload;
      })
      .addCase(fetchAllTodoLists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllTodoLists.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchTodoListById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoLists = state.todoLists.push(action.payload);
      })
      .addCase(fetchTodoListById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodoListById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const getTodoLists = (state) => state.todoLists;

export const todoListsState = (state) => state.todoLists.status;

export default todoListSlice.reducer;
