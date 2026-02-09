import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.thunks";
import { PlayerDetails } from "@/utils/UserSession";

interface AuthState {
  playerDetails: PlayerDetails | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  playerLoading: boolean;
}

const initialState: AuthState = {
  playerDetails: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  playerLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPlayerDetails: (
      state,
      action: PayloadAction<{
        playerDetails: PlayerDetails;
        accessToken: string;
      }>,
    ) => {
      state.playerDetails = action.payload.playerDetails;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    playerLoadingDone: (state) => {
      state.playerLoading = false;
    },
    logoutAction: (state) => {
      state.playerDetails = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.playerDetails = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        sessionStorage.setItem("playerDetails", JSON.stringify(action.payload));
        sessionStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.playerDetails = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        sessionStorage.setItem(
          "playerDetails",
          JSON.stringify(action.payload),
        );
        sessionStorage.setItem("accessToken", action.payload.accessToken);
      });
  },
});

export const { logoutAction, playerLoadingDone, setPlayerDetails, clearError } = authSlice.actions;
export default authSlice.reducer;
