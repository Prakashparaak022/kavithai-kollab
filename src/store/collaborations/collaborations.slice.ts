import { createSlice } from "@reduxjs/toolkit";
import { ApiCollaboration } from "@/types/api";
import {
  acceptCollab,
  addCollab,
  decisionCollab,
  inviteCollab,
  loadCollabs,
  loadMyCollaborations,
  rejectCollab,
} from "./collaborations.thunks";

type CollabsState = {
  collabs: ApiCollaboration[];
  loading: boolean;
  addLoading: boolean;
  error: string | null;
  inviteCollabLoading: boolean;
  inviteCollabError: string | null;
};

const initialState: CollabsState = {
  collabs: [],
  loading: false,
  addLoading: false,
  error: null,
  inviteCollabLoading: false,
  inviteCollabError: null,
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
      }) // DECISION COLLAB
      .addCase(decisionCollab.fulfilled, (state, action) => {
        state.collabs = state.collabs.filter((c) => c.id !== action.payload.id);
      })
      //INVITE COLLAB
      .addCase(inviteCollab.pending, (state) => {
        state.inviteCollabLoading = true;
        state.inviteCollabError = null;
      })
      .addCase(inviteCollab.fulfilled, (state, action) => {
        state.inviteCollabLoading = false;
      })
      .addCase(inviteCollab.rejected, (state, action) => {
        state.inviteCollabLoading = false;
        state.inviteCollabError = action.payload as string;
      })
      // GET MY COLLABS
      .addCase(loadMyCollaborations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyCollaborations.fulfilled, (state, action) => {
        state.loading = false;
        state.collabs = action.payload;
      })
      .addCase(loadMyCollaborations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ACCEPT COLLAB
      .addCase(acceptCollab.fulfilled, (state, action) => {
        state.collabs = state.collabs.filter((c) => c.id !== action.payload.id);
      })
      //REJECT COLLAB
      .addCase(rejectCollab.fulfilled, (state, action) => {
        state.collabs = state.collabs.filter((c) => c.id !== action.payload);
      });
  },
});

export default collabsSlice.reducer;
