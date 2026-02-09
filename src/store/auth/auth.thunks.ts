
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService } from "@/services/api/auth.service";
import { formatErrorMessage } from "@/utils/errorMessage";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginService(credentials);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(formatErrorMessage(error, "Login failed"));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await registerService(userData);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(formatErrorMessage(error, "Registration failed"));
    }
  }
);