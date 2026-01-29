import {
  AddCollabService,
  decisionCollabService,
  fetchPostCollabs,
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

export const decisionCollab = createAsyncThunk(
  "collabs/decisionCollab",
  async (payload: DecisionCollabPayload, { rejectWithValue }) => {
    try {
       const response = await decisionCollabService(payload);
      return response;
    } catch {
      return rejectWithValue("Failed to approve/reject collaboration");
    }
  }
);
