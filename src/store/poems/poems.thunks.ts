import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddLikeService,
  createPoemService,
  fetchAllPoems,
  fetchMyPoems,
  fetchPoemById,
} from "@/services/api/poems.service";
import { AddLikePayload } from "@/types/api";
import { formatErrorMessage } from "@/utils/errorMessage";
import { PaginationProps } from "@/types/pagination";

export const loadPoems = createAsyncThunk(
  "poems/loadPoems",
  async (
    { userId, isPrivate, page, size }: PaginationProps<{ userId?: number, isPrivate?:boolean }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchAllPoems({ userId, isPrivate, page, size });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(formatErrorMessage(error, "Failed to load poems"));
    }
  }
);

export const loadPoemById = createAsyncThunk(
  "poems/loadById",
  async (
    { poemId, userId }: { poemId: number; userId?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchPoemById({ poemId, userId });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to fetch poem by ID")
      );
    }
  }
);

export const createPoem = createAsyncThunk(
  "poems/createPoem",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createPoemService(formData);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to create poem")
      );
    }
  }
);

export const togglePoemLike = createAsyncThunk(
  "poems/toggleLike",
  async ({ poemId, userId, isLiked }: AddLikePayload, { rejectWithValue }) => {
    try {
      const response = await AddLikeService({ poemId, userId, isLiked });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(formatErrorMessage(error, "Failed to like poem"));
    }
  }
);

export const loadMyPoems = createAsyncThunk(
  "poems/loadMyPoems",
  async (
    { userId, isPrivate, page, size }: PaginationProps<{ userId: number, isPrivate?:boolean }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMyPoems({ userId, isPrivate, page, size });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to load my poems")
      );
    }
  }
);
