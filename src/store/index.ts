import { configureStore } from "@reduxjs/toolkit";
import { poemsReducer } from "./poems";
import { useDispatch } from "react-redux";
import { commentsReducer } from "./comments";
import { collabsReducer } from "./collaborations";
import { userProfileReducer } from "./userProfile";

export const store = configureStore({
  reducer: {
    poems: poemsReducer,
    comments: commentsReducer,
    collabs: collabsReducer,
    userProfile: userProfileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
