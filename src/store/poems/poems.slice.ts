import { createSlice } from "@reduxjs/toolkit";
import { ApiPoem } from "@/types/api";
import { createPoem, loadPoems, togglePoemLike } from "./poems.thunks";

type PoemsState = {
  poems: ApiPoem[];
  loading: boolean;
  likeLoading: number | null;
  createLoading: boolean;
  createError: string | null;
};

const initialState: PoemsState = {
  poems: [],
  loading: false,
  likeLoading: null,
  createLoading: false,
  createError: null,
};

const poemsSlice = createSlice({
  name: "poems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET POEMS
      .addCase(loadPoems.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPoems.fulfilled, (state, action) => {
        state.poems = action.payload;
        state.loading = false;
      })
      .addCase(loadPoems.rejected, (state) => {
        state.loading = false;
      })
      //CREATE POEMS
      .addCase(createPoem.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPoem.fulfilled, (state, action) => {
        state.poems.push(action.payload);
        state.createLoading = false;
      })
      .addCase(createPoem.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })
      //LIKE POEM
      .addCase(togglePoemLike.pending, (state, action) => {
        state.likeLoading = action.meta.arg.poemId;
      })
      .addCase(togglePoemLike.fulfilled, (state, action) => {
        const { id, isLiked, likesCount } = action.payload;

        const poem = state.poems.find((p) => p.id === id);
        if (poem) {
          poem.isLiked = isLiked;
          poem.likesCount = likesCount;
        }

        state.likeLoading = null;
      })
      .addCase(togglePoemLike.rejected, (state) => {
        state.likeLoading = null;
      });
  },
});

export default poemsSlice.reducer;
