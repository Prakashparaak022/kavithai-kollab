import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatErrorMessage } from "@/utils/errorMessage";
import { fetchAllCategories } from "@/services/api/category.service";
import { PaginationProps } from "@/types/pagination";

export const loadCategories = createAsyncThunk(
  "loadCategories/load",
  async (params: PaginationProps<unknown>, { rejectWithValue }) => {
    try {
      const response = await fetchAllCategories(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(
        formatErrorMessage(error, "Failed to load categories")
      );
    }
  }
);
