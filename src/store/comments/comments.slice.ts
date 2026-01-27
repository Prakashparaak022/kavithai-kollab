import { createSlice } from "@reduxjs/toolkit";
import { ApiComment } from "@/types/api";
import { addComment, loadComments } from "./comments.thunks";

type CommentsState = {
  comments: ApiComment[];
  loading: boolean;
  addLoading: boolean;

  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  addLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD COMMENTS
      .addCase(loadComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
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
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentsSlice.reducer;
