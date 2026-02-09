"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { logoutAction } from "@/store/auth";

/* ------------------------------
   Types
--------------------------------*/

type AuthContextType = {
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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = useCallback(() => {
    dispatch(logoutAction());
    sessionStorage.clear();
    router.push("/");
  }, [dispatch, router]);

  /* ------------------------------
     Memoized Value
  --------------------------------*/

  const value = useMemo<AuthContextType>(
    () => ({
      logout,
    }),
    [logout],
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
