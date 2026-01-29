import { createSlice } from "@reduxjs/toolkit";
import { ApiCollaboration } from "@/types/api";
import {
  addCollab,
  approveCollab,
  loadCollabs,
  rejectCollab,
} from "./collaborations.thunks";

type CollabsState = {
  collabs: ApiCollaboration[];
  loading: boolean;
  addLoading: boolean;

  error: string | null;
};

const initialState: CollabsState = {
  collabs: [],
  loading: false,
  addLoading: false,
  error: null,
};

const collabsSlice = createSlice({
  name: "collabs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD COLLABS
      .addCase(loadCollabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCollabs.fulfilled, (state, action) => {
        state.loading = false;
        state.collabs = action.payload;
      })
      .addCase(loadCollabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ADD COLLAB
      .addCase(addCollab.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addCollab.fulfilled, (state, action) => {
        state.addLoading = false;
        state.collabs.push(action.payload);
      })
      .addCase(addCollab.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
      }) // APPROVE COLLAB
      .addCase(approveCollab.fulfilled, (state, action) => {
        state.collabs = state.collabs.filter(
          (c) => c.id !== action.payload.collabId
        );
      })

      // REJECT COLLAB
      .addCase(rejectCollab.fulfilled, (state, action) => {
        state.collabs = state.collabs.filter(
          (c) => c.id !== action.payload.collabId
        );
      });
  },
});

export default collabsSlice.reducer;
