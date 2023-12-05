import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../data/userSlice";
import todoListsReducer from "../data/todoListsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todoLists: todoListsReducer
  },
});
