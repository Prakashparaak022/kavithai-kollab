import { createSlice } from "@reduxjs/toolkit";
import { ApiCategory } from "@/types/api";
import { loadCategories } from "./category.thunks";
import { createPaginatedState } from "@/types/pagination";

const categorySlice = createSlice({
  name: "categories",
  initialState: createPaginatedState<ApiCategory>(10),
  reducers: {
    resetCategories(state) {
      state.items = [];
      state.page = 0;
      state.total = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        const { content, totalElements, number } = action.payload;

        state.loading = false;

        state.items = number === 0 ? content : [...state.items, ...content];

        state.page = number;
        state.total = totalElements;
        state.hasMore = state.items.length < totalElements;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
