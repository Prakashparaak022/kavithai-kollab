import { createSlice } from "@reduxjs/toolkit";
import { ApiUserProfile } from "@/types/api";
import { loadUserProfiles } from "./userProfile.thunks";
import { createInitialPaginatedState } from "@/types/pagination";

const userProfileSlice = createSlice({
  name: "userProfiles",
  initialState: createInitialPaginatedState<ApiUserProfile>(10),
  reducers: {
    resetUserProfiles(state) {
      state.items = [];
      state.page = 0;
      state.total = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserProfiles.fulfilled, (state, action) => {
        const { content, totalElements, number } = action.payload;

        state.loading = false;

        state.items = number === 0 ? content : [...state.items, ...content];

        state.page = number;
        state.total = totalElements;
        state.hasMore = state.items.length < totalElements;
      })
      .addCase(loadUserProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserProfiles } = userProfileSlice.actions;
export default userProfileSlice.reducer;
