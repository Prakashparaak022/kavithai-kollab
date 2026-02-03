import { createSlice } from "@reduxjs/toolkit";
import { ApiComment } from "@/types/api";
import { addComment, loadComments } from "./comments.thunks";
import { createPaginatedState } from "@/types/pagination";

const initialState = createPaginatedState<ApiComment, { addLoading: boolean }>(10, {
  addLoading: false,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    resetComments(state) {
      state.items = [];
      state.page = 0;
      state.total = 0;
      state.hasMore = true;
      state.error = null;
      state.addLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOAD COMMENTS
      .addCase(loadComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { content, totalElements, number } = action.payload;

        state.loading = false;

        state.items = number === 0 ? content : [...state.items, ...content];

        state.page = number;
        state.total = totalElements;
        state.hasMore = state.items.length < totalElements;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ADD COMMENT
      .addCase(addComment.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
