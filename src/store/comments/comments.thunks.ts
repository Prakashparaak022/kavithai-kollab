import {
  AddCommentService,
  fetchPostComments,
} from "@/services/api/comments.service";
import { AddCommentPayload } from "@/types/api";
import { PaginationProps } from "@/types/pagination";
import { formatErrorMessage } from "@/utils/errorMessage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (
    { postId, page, size }: PaginationProps<{ postId: number }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchPostComments({ postId, page, size });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "failed to load comments")
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "poems/addComment",
  async (payload: AddCommentPayload, { rejectWithValue }) => {
    try {
      const response = await AddCommentService(payload);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to add comment")
      );
    }
  }
);
