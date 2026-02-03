import { createSlice } from "@reduxjs/toolkit";
import { ApiPoem } from "@/types/api";
import {
  createPoem,
  loadMyPoems,
  loadPoemById,
  loadPoems,
  togglePoemLike,
} from "./poems.thunks";
import { createPaginatedState, PaginatedState } from "@/types/pagination";

type PoemsState = {
  poems: PaginatedState<ApiPoem>;
  myPoems: PaginatedState<ApiPoem>;
  likeLoading: number | null;
  createLoading: boolean;
  createError: string | null;
  selectedPoem: ApiPoem | null;
  selectedPoemLoading: boolean;
};

const initialState: PoemsState = {
  poems: createPaginatedState<ApiPoem>(10),
  myPoems: createPaginatedState<ApiPoem>(10),

  likeLoading: null,

  createLoading: false,
  createError: null,

  selectedPoem: null,
  selectedPoemLoading: false,
};

const poemsSlice = createSlice({
  name: "poems",
  initialState,
  reducers: {
    resetPoems: (state) => {
      state.poems = createPaginatedState<ApiPoem>(state.poems.size);
    },
    resetMyPoems: (state) => {
      state.myPoems = createPaginatedState<ApiPoem>(state.myPoems.size);
    },
  },
  extraReducers: (builder) => {
    builder
      //GET POEMS
      .addCase(loadPoems.pending, (state) => {
        state.poems.loading = true;
      })
      .addCase(loadPoems.fulfilled, (state, action) => {
        const { content, number, totalElements } = action.payload;

        state.poems.loading = false;
        state.poems.items =
          number === 0 ? content : [...state.poems.items, ...content];
        state.poems.page = number;
        state.poems.total = totalElements;
        state.poems.hasMore = state.poems.items.length < totalElements;
      })
      .addCase(loadPoems.rejected, (state, action) => {
        state.poems.loading = false;
        state.poems.error = action.payload as string;
      })
      //CREATE POEMS
      .addCase(createPoem.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPoem.fulfilled, (state, action) => {
        state.poems.items.push(action.payload);
        state.myPoems.items.push(action.payload);
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

        update(state.poems.items);
        update(state.myPoems.items);

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
        state.myPoems.loading = true;
      })
      .addCase(loadMyPoems.fulfilled, (state, action) => {
        const { content, number, totalElements } = action.payload;

        state.myPoems.loading = false;
        state.myPoems.items =
          number === 0 ? content : [...state.myPoems.items, ...content];

        state.myPoems.page = number;
        state.myPoems.total = totalElements;
        state.myPoems.hasMore = state.myPoems.items.length < totalElements;
      })
      .addCase(loadMyPoems.rejected, (state, action) => {
        state.myPoems.loading = false;
        state.myPoems.error = action.payload as string;
      });
  },
});

export const { resetPoems, resetMyPoems } = poemsSlice.actions;
export default poemsSlice.reducer;
