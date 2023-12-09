import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteAccount, getUser, signInUser, signUpUser, updatePasswordWithToken, updateUser,} from "../api/userAPI";

const initialState = {
    status: "idle",
    error: null,
    userObject: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        jwt: "",
        userId: "",
    },
};

// Async thunks

export const fetchGetUser = createAsyncThunk(
    "user/fetchGetUser",
    async (payload) => {
        const response = await getUser(payload);
        return response.data;
    }
);

export const fetchUpdateUser = createAsyncThunk(
    "user/fetchUpdateUser",
    async (payload) => {
        const response = await updateUser(payload);

        return response.data;
    }
);

export const fetchSignInUser = createAsyncThunk(
    "user/fetchSignInUser",
    async (payload) => {
        const response = await signInUser(payload);

        return response.data;
    }
);

export const fetchSignUpUser = createAsyncThunk(
    "user/fetchSignUpUser",
    async (payload) => {
        const response = await signUpUser(payload);

        return response.data;
    }
);

export const fetchResetUserPassword = createAsyncThunk(
    "user/fetchResetUserPassword",

    async (payload) => {
        const response = await updatePasswordWithToken(payload);

        return response.data;
    }
);

export const fetchDeleteAccount = createAsyncThunk(
    "user/fetchDeleteAccount",

    async (payload) => {
        const response = await deleteAccount(payload);

        return response.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(fetchSignInUser.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.userObject = action.payload;

                localStorage.setItem("userId", action.payload.userId);
                localStorage.setItem("jwt", action.payload.token);
                localStorage.setItem("isUserSignedIn", true);
            })
            .addCase(fetchSignInUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchSignInUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchGetUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userObject = action.payload;
            })

            .addCase(fetchGetUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.userObject = action.payload;
            })

            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

            .addCase(fetchSignUpUser.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.userObject = action.payload;

                localStorage.setItem("userId", action.payload.userId);
                localStorage.setItem("jwt", action.payload.token);
                localStorage.setItem("isUserSignedIn", true);
            })
            .addCase(fetchSignUpUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchSignUpUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(fetchResetUserPassword.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.userObject = action.payload;

                localStorage.setItem("userId", action.payload.userId);
                localStorage.setItem("jwt", action.payload.token);
                localStorage.setItem("isUserSignedIn", true);
            })
            .addCase(fetchResetUserPassword.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchResetUserPassword.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(fetchDeleteAccount.fulfilled, (state, action) => {
                state.status = "succeeded";

                state = null;
            });
    },
});

export const getUserFromStore = (state) => state.user.userObject;


export default userSlice.reducer;
