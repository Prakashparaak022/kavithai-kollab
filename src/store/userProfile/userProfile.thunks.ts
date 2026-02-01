import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfiles } from "@/services/api/userProfile.service";
import { formatErrorMessage } from "@/utils/errorMessage";

export const loadUserProfiles = createAsyncThunk(
  "userProfiles/load",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfiles(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to load user profiles")
      );
    }
  }
);
