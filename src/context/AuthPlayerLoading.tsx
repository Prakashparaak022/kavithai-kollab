"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { playerLoadingDone, setPlayerDetails } from "@/store/auth";
import { PlayerDetails } from "@/utils/UserSession";

const AuthPlayerLoading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const playerDetailsStr = sessionStorage.getItem("playerDetails");
    const accessToken = sessionStorage.getItem("accessToken");

    if (!playerDetailsStr || !accessToken) {
      dispatch(playerLoadingDone());
      return;
    }
    try {
      const parsed = JSON.parse(playerDetailsStr) as PlayerDetails;

      dispatch(
        setPlayerDetails({
          playerDetails: parsed,
          accessToken,
        }),
      );
    } catch (error) {
      console.error("Failed to parse playerDetails:", error);
    } finally {
      dispatch(playerLoadingDone());
    }
  }, [dispatch]);

  return null;
};

export default AuthPlayerLoading;
