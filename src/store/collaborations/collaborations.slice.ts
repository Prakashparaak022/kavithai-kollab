import { createSlice } from "@reduxjs/toolkit";
import { ApiCollaboration } from "@/types/api";
import {
  acceptCollab,
  addCollab,
  decisionCollab,
  inviteCollab,
  loadCollabs,
  loadMyCollabs,
  rejectCollab,
} from "./collaborations.thunks";
import { createPaginatedState, PaginatedState } from "@/types/pagination";

type PoemsState = {
  collabs: PaginatedState<ApiCollaboration>;
  myCollabs: PaginatedState<ApiCollaboration>;
  createLoading: boolean;
  createError: string | null;
  inviteCollabLoading: boolean;
  inviteCollabError: string | null;
};

const initialState: PoemsState = {
  collabs: createPaginatedState<ApiCollaboration>(10),
  myCollabs: createPaginatedState<ApiCollaboration>(10),
  createLoading: false,
  createError: null,
  inviteCollabLoading: false,
  inviteCollabError: null,
};

const collabsSlice = createSlice({
  name: "collabs",
  initialState: initialState,
  reducers: {
    resetCollabs: (state) => {
      state.collabs = createPaginatedState<ApiCollaboration>(
        state.collabs.size
      );
    },
    resetMyCollabs: (state) => {
      state.myCollabs = createPaginatedState<ApiCollaboration>(
        state.myCollabs.size
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // LOAD COLLABS
      .addCase(loadCollabs.pending, (state) => {
        state.collabs.loading = true;
      })
      .addCase(loadCollabs.fulfilled, (state, action) => {
        const { content, number, totalElements } = action.payload;

        state.collabs.loading = false;
        state.collabs.items =
          number === 0 ? content : [...state.collabs.items, ...content];
        state.collabs.page = number;
        state.collabs.total = totalElements;
        state.collabs.hasMore = state.collabs.items.length < totalElements;
      })
      .addCase(loadCollabs.rejected, (state, action) => {
        state.collabs.loading = false;
        state.collabs.error = action.payload as string;
      })
      //ADD COLLAB
      .addCase(addCollab.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(addCollab.fulfilled, (state, action) => {
        state.collabs.items.push(action.payload);
        state.createLoading = false;
      })
      .addCase(addCollab.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })
      // DECISION COLLAB
      .addCase(decisionCollab.fulfilled, (state, action) => {
        state.collabs.items = state.collabs.items.filter(
          (c) => c.id !== action.payload.id
        );
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
      .addCase(loadMyCollabs.pending, (state) => {
        state.myCollabs.loading = true;
      })
      .addCase(loadMyCollabs.fulfilled, (state, action) => {
        const { content, number, totalElements } = action.payload;

        state.myCollabs.loading = false;
        state.myCollabs.items =
          number === 0 ? content : [...state.myCollabs.items, ...content];

        state.myCollabs.page = number;
        state.myCollabs.total = totalElements;
        state.myCollabs.hasMore = state.myCollabs.items.length < totalElements;
      })
      .addCase(loadMyCollabs.rejected, (state, action) => {
        state.myCollabs.loading = false;
        state.myCollabs.error = action.payload as string;
      })
      // ACCEPT COLLAB
      .addCase(acceptCollab.fulfilled, (state, action) => {
        state.myCollabs.items = state.myCollabs.items.filter(
          (c) => c.id !== action.payload.id
        );
      })
      //REJECT COLLAB
      .addCase(rejectCollab.fulfilled, (state, action) => {
        state.myCollabs.items = state.myCollabs.items.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export const { resetCollabs, resetMyCollabs } = collabsSlice.actions;
export default collabsSlice.reducer;
