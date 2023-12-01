import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInUser,
  signUpUser,
  updatePasswordWithToken,
} from "../api/userAPI";

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
      });
  },
});

export const getUser = (state) => state.userObject;

export const getError = (state) => state.error;

export default userSlice.reducer;