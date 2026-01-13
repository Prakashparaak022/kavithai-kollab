import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiPoem } from "@/types/api";
import { fetchAllPoems } from "@/services/api/poems.service";

export const loadPoems = createAsyncThunk("poems/loadPoems", async () => {
  const response = await fetchAllPoems();
  return response.content;
});

type PoemsState = {
  poems: ApiPoem[];
  loading: boolean;
};

const initialState: PoemsState = {
  poems: [],
  loading: false,
};

const poemsSlice = createSlice({
  name: "poems",
  initialState,
  reducers: {
    addPoem: (state, action) => {
      state.poems.unshift(action.payload);
    },
    updatePoem: (state, action) => {
      const index = state.poems.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.poems[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPoems.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPoems.fulfilled, (state, action) => {
        state.poems = action.payload;
        state.loading = false;
      })                                                                                                                                                                                 
      .addCase(loadPoems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addPoem, updatePoem } = poemsSlice.actions;
export default poemsSlice.reducer;
