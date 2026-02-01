import { createSlice } from "@reduxjs/toolkit";
import { ApiUserProfile } from "@/types/api";
import { loadUserProfiles } from "./userProfile.thunks";

type UserProfileState = {
  userProfiles: ApiUserProfile[];
  loading: boolean;
  error: string | null;
};

const initialState: UserProfileState = {
  userProfiles: [],
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfiles = action.payload;
      })
      .addCase(loadUserProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userProfileSlice.reducer;
