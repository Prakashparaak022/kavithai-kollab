"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  PlayerDetails,
  setSessionStorage,
  usePlayerDetails,
} from "@/utils/UserSession";

/* ------------------------------
   Types
--------------------------------*/

type AuthContextType = {
  playerDetails: PlayerDetails | null;
  login: (userData: PlayerDetails) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

/* ------------------------------
   Context
--------------------------------*/

const AuthContext = createContext<AuthContextType | null>(null);

/* ------------------------------
   Provider
--------------------------------*/

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { playerDetails } = usePlayerDetails();
  const router = useRouter();

  /* ------------------------------
     Login / Logout
  --------------------------------*/

  const login = useCallback((userData: PlayerDetails) => {
    if (!userData) return;

    setSessionStorage("playerDetails", JSON.stringify(userData));

    if (userData.accessToken) {
      setSessionStorage("accessToken", userData.accessToken);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.clear();

    window.dispatchEvent(
      new CustomEvent("sessionStorageUpdated", {
        detail: { key: "playerDetails" },
      })
    );

    router.push("/");
  }, [router]);

  /* ------------------------------
     Memoized Value
  --------------------------------*/

  const value = useMemo<AuthContextType>(
    () => ({
      playerDetails,
      login,
      logout,
    }),
    [playerDetails, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ------------------------------
   Hook
--------------------------------*/

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
