import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import {
    addNewTodoList,
    deleteTodoList,
    getAllTodoLists,
    getTodoListById,
    updateExistingTodoList,
} from "../api/todoListAPI";

import {createAction, deleteAction, updateAction} from "../api/actionListAPI";

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

export const fetchTodoListById = createAsyncThunk(
    "todoLists/fetchTodoListById",
    async (todoListId) => {
        const response = await getTodoListById(todoListId);

        return response.data;
    }
);

export const fetchUpdateExistingTodoList = createAsyncThunk(
    "todoLists/fetchUpdateExistingTodoList",
    async (payload, todoListId) => {
        const response = await updateExistingTodoList(payload, todoListId);

        return response.data;
    }
);

export const fetchCreateNewTodoList = createAsyncThunk(
    "todoLists/fetchCreateNewTodoList",
    async (payload) => {
        const response = await addNewTodoList(payload);
        return response.data;
    }
);

export const fetchDeleteTodoList = createAsyncThunk(
    "todoLists/fetchDeleteTodoList",
    async (payload) => {
        await deleteTodoList(payload);

        return payload.id;
    }
);

export const fetchUpdateActionItem = createAsyncThunk(
    "todoLists/actions/fetchUpdateActionItem",
    async (payload) => {
        const todoListId = payload.todoListId;
        const apiResponse = await updateAction(payload);

        return {
            data: apiResponse,
            todoListId: todoListId,
        };
    }
);

export const fetchCreateActionItem = createAsyncThunk(
    "todoLists/actions/fetchCreateActionItem",
    async (payload) => {
        const todoListId = payload.todoListId;
        const apiResponse = await createAction(payload);

        return {
            data: apiResponse,
            todoListId: todoListId,
        };
    }
);
export const fetchDeleteActionItem = createAsyncThunk(
    "todoLists/actions/fetchDeleteActionItem",
    async (payload) => {
        const todoListId = payload.todoListId;
        const apiResponse = await deleteAction(payload);

        return {
            id: payload.id,
            todoListId: todoListId,
        };
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
                state.todoLists = [...state.todoLists, ...action.payload];
            })
            .addCase(fetchAllTodoLists.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAllTodoLists.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
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
                state.status = "failed";
            })

            .addCase(fetchUpdateExistingTodoList.fulfilled, (state, action) => {
                const updatedTodoList = action.payload;

                const index = state.todoLists.findIndex(
                    (todoList) => todoList.id === updatedTodoList.id
                );

                if (index !== -1) {
                    // If the todo list exists, update it in the array
                    state.todoLists[index] = updatedTodoList;
                    state.status = "succeeded";
                } else {
                    state.status = "failed";
                }
            })
            .addCase(fetchUpdateExistingTodoList.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchDeleteTodoList.fulfilled, (state, action) => {
                state.status = "succeeded";

                //Use filter to create a new array without the todoList with the specified ID
                try {
                    state.todoLists = state.todoLists.filter(
                        (todoList) => todoList.id !== action.payload
                    );
                } catch (error) {
                    state.status = "failed";
                }
            })

            .addCase(fetchDeleteTodoList.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchCreateNewTodoList.fulfilled, (state, action) => {
                const newTodoList = {...action.payload, actionList: []};

                state.todoLists.push(newTodoList);
                state.status = "succeeded";
            })
            .addCase(fetchCreateNewTodoList.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchCreateActionItem.fulfilled, (state, action) => {
                state.status = "succeeded";

                const todoListId = action.payload.todoListId;

                // Find the index of the todoList in the state
                const todoListIndex = state.todoLists.findIndex(
                    (todoList) => todoList.id === todoListId
                );

                // Add the new action to the actionList of the todoList
                state.todoLists[todoListIndex].actionList.push(action.payload.data);
            })

            .addCase(fetchUpdateActionItem.fulfilled, (state, action) => {
                state.status = "succeeded";

                const todoListId = action.payload.todoListId;
                const updatedAction = action.payload.data;

                // Find the index of the todoList in the state
                const todoListIndex = state.todoLists.findIndex(
                    (todoList) => todoList.id === todoListId
                );

                // Find the index of the action in the actionList
                const actionIndex = state.todoLists[todoListIndex].actionList.findIndex(
                    (actionItem) => actionItem.id === updatedAction.id
                );

                // Update the specific action in the actionList of the todoList
                state.todoLists[todoListIndex].actionList[actionIndex] = updatedAction;
            })
            .addCase(fetchUpdateActionItem.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchDeleteActionItem.fulfilled, (state, action) => {
                state.status = "succeeded";

                const todoListId = action.payload.todoListId;
                const deletedActionId = action.payload.id;

                // Find the index of the todoList in the state
                const todoListIndex = state.todoLists.findIndex(
                    (todoList) => todoList.id === todoListId
                );

                // Find the index of the action in the actionList
                const deletedActionIndex = state.todoLists[
                    todoListIndex
                    ].actionList.findIndex(
                    (actionItem) => actionItem.id === deletedActionId
                );

                state.todoLists[todoListIndex].actionList.splice(deletedActionIndex, 1);
            })
            .addCase(fetchDeleteActionItem.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            });
    },
});

export const getTodoLists = (state) => state.todoLists;

export const todoListsState = (state) => state.todoLists.status;

export const getTodoListFromStoreById = (state, todoListId) => {
    const todoLists = state.todoLists.todoLists;
    return todoLists.find((todoList) => todoList.id === todoListId);
};

export default todoListSlice.reducer;
