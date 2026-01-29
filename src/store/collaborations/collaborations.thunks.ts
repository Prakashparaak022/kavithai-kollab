import {
  AddCollabService,
  ApproveCollabService,
  fetchPostCollabs,
  rejectCollabService,
} from "@/services/api/collaboration.service";
import { AddCollabPayload, DecisionCollabPayload } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCollabs = createAsyncThunk(
  "collabs/loadCollabs",
  async ({ postId }: { postId: number }, { rejectWithValue }) => {
    try {
      const response = await fetchPostCollabs({ postId });
      return response.content;
    } catch {
      return rejectWithValue("failed to load collaborations");
    }
  }
);

export const addCollab = createAsyncThunk(
  "collabs/addCollab",
  async (payload: AddCollabPayload, { rejectWithValue }) => {
    try {
      const response = await AddCollabService(payload);
      return response;
    } catch {
      return rejectWithValue("Failed to add collaboration");
    }
  }
);

export const approveCollab = createAsyncThunk(
  "collabs/approveCollab",
  async (payload: DecisionCollabPayload, { rejectWithValue }) => {
    try {
      await ApproveCollabService(payload);
      return payload;
    } catch {
      return rejectWithValue("Failed to approve collaboration");
    }
  }
);

export const rejectCollab = createAsyncThunk(
  "collabs/rejectCollab",
  async (payload: DecisionCollabPayload, { rejectWithValue }) => {
    try {
      await rejectCollabService(payload);
      return payload;
    } catch {
      return rejectWithValue("Failed to reject collaboration");
    }
  }
);
