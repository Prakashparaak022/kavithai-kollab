import { createSlice } from "@reduxjs/toolkit";
import { ApiPoem } from "@/types/api";
import {
  createPoem,
  loadMyPoems,
  loadPoemById,
  loadPoems,
  togglePoemLike,
} from "./poems.thunks";

type PoemsState = {
  poems: ApiPoem[];
  loading: boolean;
  likeLoading: number | null;
  createLoading: boolean;
  createError: string | null;
  selectedPoem: ApiPoem | null;
  selectedPoemLoading: boolean;
  myPoems: ApiPoem[];
  myPoemLoading: boolean;
  myPoemError: string | null;
};

const initialState: PoemsState = {
  poems: [],
  loading: false,
  likeLoading: null,
  createLoading: false,
  createError: null,
  selectedPoem: null,
  selectedPoemLoading: false,
  myPoemLoading: false,
  myPoems: [],
  myPoemError: null,
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
        state.myPoems.push(action.payload);
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

        const update = (list: ApiPoem[]) => {
          const poem = list.find((p) => p.id === id);
          if (poem) {
            poem.isLiked = isLiked;
            poem.likesCount = likesCount;
          }
        };

        update(state.poems);
        update(state.myPoems);

        state.likeLoading = null;
      })
      .addCase(togglePoemLike.rejected, (state) => {
        state.likeLoading = null;
      })
      //LOAD POEM BY ID
      .addCase(loadPoemById.pending, (state) => {
        state.selectedPoemLoading = true;
      })
      .addCase(loadPoemById.fulfilled, (state, action) => {
        state.selectedPoem = action.payload;
        state.selectedPoemLoading = false;
      })
      .addCase(loadPoemById.rejected, (state) => {
        state.selectedPoemLoading = false;
      })
      //GET MY POEMS
      .addCase(loadMyPoems.pending, (state) => {
        state.myPoemLoading = true;
      })
      .addCase(loadMyPoems.fulfilled, (state, action) => {
        state.myPoems = action.payload;
        state.myPoemLoading = false;
      })
      .addCase(loadMyPoems.rejected, (state) => {
        state.myPoemLoading = false;
      });
  },
});

export default poemsSlice.reducer;
