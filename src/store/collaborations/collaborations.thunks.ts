import {
  acceptCollabService,
  AddCollabService,
  decisionCollabService,
  fetchMyCollabs,
  fetchPostCollabs,
  inviteCollabService,
  rejectCollabService,
} from "@/services/api/collaboration.service";
import {
  AddCollabPayload,
  DecisionCollabPayload,
  InviteCollabPayload,
} from "@/types/api";
import { PaginationProps } from "@/types/pagination";
import { formatErrorMessage } from "@/utils/errorMessage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCollabs = createAsyncThunk(
  "collabs/loadCollabs",
  async (
    { postId, page, size }: PaginationProps<{ postId: number }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchPostCollabs({ postId, page, size });
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "failed to load collaborations")
      );
    }
  }
);

export const addCollab = createAsyncThunk(
  "collabs/addCollab",
  async (payload: AddCollabPayload, { rejectWithValue }) => {
    try {
      const response = await AddCollabService(payload);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to add collaboration")
      );
    }
  }
);

export const decisionCollab = createAsyncThunk(
  "collabs/decisionCollab",
  async (payload: DecisionCollabPayload, { rejectWithValue }) => {
    try {
      const response = await decisionCollabService(payload);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to approve/reject collaboration")
      );
    }
  }
);

export const inviteCollab = createAsyncThunk(
  "collabs/inviteCollab",
  async (payload: InviteCollabPayload, { rejectWithValue }) => {
    try {
      const response = await inviteCollabService(payload);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to invite collaboration")
      );
    }
  }
);

export const loadMyCollabs = createAsyncThunk(
  "collabs/myCollabs",
  async (
    { userId, page, size }: PaginationProps<{ userId: number }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchMyCollabs({ userId, page, size });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to load collaborations");
    }
  }
);

export const acceptCollab = createAsyncThunk(
  "collabs/accept",
  async (
    { collabId, userId }: { collabId: number; userId: number },
    { rejectWithValue }
  ) => {
    try {
      return await acceptCollabService({ collabId, userId });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to accept collaboration");
    }
  }
);

export const rejectCollab = createAsyncThunk(
  "collabs/reject",
  async (
    { collabId, userId }: { collabId: number; userId: number },
    { rejectWithValue }
  ) => {
    try {
      await rejectCollabService({ collabId, userId });
      return collabId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to reject collaboration");
    }
  }
);
