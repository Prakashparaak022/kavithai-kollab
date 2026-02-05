import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserProfileById,
  fetchUserProfiles,
} from "@/services/api/userProfile.service";
import { formatErrorMessage } from "@/utils/errorMessage";
import { ApiUsersParams } from "@/types/api";

export const loadUserProfiles = createAsyncThunk(
  "userProfiles/load",
  async (params: ApiUsersParams, { rejectWithValue }) => {
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

export const loadUserProfileById = createAsyncThunk(
  "userProfiles/loadById",
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfileById({ userId });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to fetch user profile by ID")
      );
    }
  }
);
