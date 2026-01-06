"use client";

import { useEffect, useState } from "react";

export type PlayerDetails = {
  userName?: string;
  [key: string]: unknown;
};

export function useSessionStorage<T = string | null>(key: string): T | null {
  const [value, setValue] = useState<T | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(key) as T | null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = () => {
      setValue(sessionStorage.getItem(key) as T | null);
    };

    const handleCustomStorageEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ key: string }>;
      if (customEvent.detail?.key === key) {
        setValue(sessionStorage.getItem(key) as T | null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("sessionStorageUpdated", handleCustomStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "sessionStorageUpdated",
        handleCustomStorageEvent
      );
    };
  }, [key]);

  return value;
}

/**
 * Hook to read player details & auth token from sessionStorage
 */
export const usePlayerDetails = (): {
  playerDetails: PlayerDetails | null;
  loading: boolean;
  accessToken: string | null;
} => {
  const playerDetailsStr = useSessionStorage<string>("playerDetails");
  const accessToken = useSessionStorage<string>("accessToken");

  const [playerDetails, setPlayerDetails] = useState<PlayerDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (playerDetailsStr) {
      setLoading(true);
      try {
        const parsed: unknown = JSON.parse(playerDetailsStr);

        if (typeof parsed === "object" && parsed !== null) {
          setPlayerDetails(parsed as PlayerDetails);
        } else {
          setPlayerDetails(null);
        }
      } catch (err) {
        console.error("Failed to parse playerDetails:", err);
        setPlayerDetails(null);
      } finally {
        setLoading(false);
      }
    } else {
      setPlayerDetails(null);
    }
  }, [playerDetailsStr]);

  return { playerDetails, loading, accessToken };
};

/**
 * Utility function to update sessionStorage reactively
 */
export function setSessionStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("sessionStorageUpdated", {
        detail: { key },
      })
    );
  } catch (error) {
    console.error(`Error setting sessionStorage for key "${key}":`, error);
  }
}
