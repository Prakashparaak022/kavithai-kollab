import { createSlice } from "@reduxjs/toolkit";
import { ApiComment } from "@/types/api";
import { addComment, loadComments } from "./comments.thunks";
import { createPaginatedState, PaginatedState } from "@/types/pagination";

type CommentsState = {
  comments: PaginatedState<ApiComment>;
  createLoading: boolean;
  createError: string | null;
};

const initialState: CommentsState = {
  comments: createPaginatedState<ApiComment>(10),
  createLoading: false,
  createError: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = createPaginatedState<ApiComment>(state.comments.size);
    },
  },
  extraReducers: (builder) => {
    builder
      // LOAD COMMENTS
      .addCase(loadComments.pending, (state) => {
        state.comments.loading = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { content, number, totalElements } = action.payload;

        state.comments.loading = false;
        state.comments.items =
          number === 0 ? content : [...state.comments.items, ...content];
        state.comments.page = number;
        state.comments.total = totalElements;
        state.comments.hasMore = state.comments.items.length < totalElements;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.comments.loading = false;
        state.comments.error = action.payload as string;
      })
      // ADD COMMENT
      .addCase(addComment.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.items.push(action.payload);
        state.createLoading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
