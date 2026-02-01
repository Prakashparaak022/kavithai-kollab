import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfiles } from "@/services/api/userProfile.service";
import { formatErrorMessage } from "@/utils/errorMessage";

export const loadUserProfiles = createAsyncThunk(
  "userProfiles/load",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await fetchUserProfiles(params);
      return res.content;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to load user profiles")
      );
    }
  }
);
