import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddLikeService,
  createPoemService,
  fetchAllPoems,
} from "@/services/api/poems.service";
import { AddLikePayload } from "@/types/api";

export const loadPoems = createAsyncThunk(
  "poems/loadPoems",
  async ({ userId }: { userId?: number }, { rejectWithValue }) => {
    try {
      const response = await fetchAllPoems({ userId });
      return response.content;
    } catch {
      return rejectWithValue("Failed to load poems");
    }
  }
);

export const createPoem = createAsyncThunk(
  "poems/createPoem",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createPoemService(formData);
      return response;
    } catch {
      return rejectWithValue("Failed to create poem");
    }
  }
);

export const togglePoemLike = createAsyncThunk(
  "poems/toggleLike",
  async ({ poemId, userId, isLiked }: AddLikePayload, { rejectWithValue }) => {
    try {
      const response = await AddLikeService({ poemId, userId, isLiked });
      return response;
    } catch {
      return rejectWithValue("Failed to like poem");
    }
  }
);
