import { RootState } from "@/store";

export const selectPlayerDetails = (state: RootState) =>
  state.auth.playerDetails;

export const selectDisplayName = (state: RootState) =>
  state.auth.playerDetails?.penName ||
  state.auth.playerDetails?.firstName ||
  "";