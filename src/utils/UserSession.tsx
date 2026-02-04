"use client";

import { useEffect, useState } from "react";

export type PlayerDetails = {
  id: number;
  firstName: string;
  lastName: string;
  penName?: string;
  email?: string;
  phoneNo?: string;
  gender?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneCountryIsdcodeId?: string;
  countryId?: string;
  accessToken?: string;
  authorImage?: string;
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
  displayName: string | null;
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
    setLoading(true);

    const loadPlayerDetails = async () => {
      if (!playerDetailsStr) {
        setPlayerDetails(null);
        setLoading(false);
        return;
      }

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
    };

    loadPlayerDetails();
  }, [playerDetailsStr]);

  const displayName =
    playerDetails?.penName ?? playerDetails?.firstName ?? null;

  return { playerDetails, displayName, loading, accessToken };
};

/**
 * Utility function to update sessionStorage reactively
 */
export function setSessionStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(key, value);
    window.dispatchEvent(
      new CustomEvent("sessionStorageUpdated", { detail: { key } })
    );
  } catch (error) {
    console.error(`Error setting sessionStorage for key "${key}":`, error);
  }
}
