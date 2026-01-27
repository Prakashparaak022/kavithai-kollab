import { configureStore } from "@reduxjs/toolkit";
import { poemsReducer } from "./poems";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    poems: poemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();