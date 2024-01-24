import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";
import { isValidToken } from "../utils/tokenUtils";

const initialState = {
  token: null || localStorage.getItem("DomaineDeLipica_token"),
  isAuth:
    localStorage.getItem("DomaineDeLipica_token") &&
    isValidToken(localStorage.getItem("DomaineDeLipica_token")),
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await AuthService.signup(credentials);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await AuthService.login(credentials);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.access_token;
        localStorage.setItem("DomaineDeLipica_token", state.token);
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error.message;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.access_token;
        localStorage.setItem("DomaineDeLipica_token", state.token);
        state.isAuth = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error.message;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
