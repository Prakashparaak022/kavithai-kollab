"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

import { fetchBrandID } from "@/lib/fetchBrandId";
import { getDeviceDetails } from "@/utils/getDeviceDetails";
import { setSessionStorage, usePlayerDetails } from "@/utils/UserSession";

/* ------------------------------
   Types
--------------------------------*/

type AuthContextType = {
  brandId: string | null;
  deviceDetails: Record<string, unknown> | null;
  playerDetails: any;
  login: (userData: any) => void;
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

  const [deviceDetails, setDeviceDetails] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [brandId, setBrandId] = useState<string | null>(null);

  /* ------------------------------
     Login / Logout
  --------------------------------*/

  const login = (userData: any) => {
    if (!userData) return;
    setSessionStorage("playerDetails", JSON.stringify(userData));
    setSessionStorage("accessToken", userData?.accessToken);
  };

  const logout = () => {
    sessionStorage.clear();
    window.dispatchEvent(
      new CustomEvent("sessionStorageUpdated", {
        detail: { key: "playerDetails" },
      })
    );
  };

  /* ------------------------------
     Brand + Device Setup
  --------------------------------*/

  useEffect(() => {
    const fetchAllDetails = async () => {
      let storedBrandId = sessionStorage.getItem("brandId");

      if (storedBrandId) {
        setBrandId(storedBrandId);
      } else {
        storedBrandId = await fetchBrandID();

        if (!storedBrandId) {
          toast.error("Failed to retrieve brand ID.");
          return;
        }

        sessionStorage.setItem("brandId", storedBrandId);
        setBrandId(storedBrandId);
      }

      const details = getDeviceDetails({}, "");
      setDeviceDetails(details);
    };

    fetchAllDetails();
  }, []);

  /* ------------------------------
     Memoized Value
  --------------------------------*/

  const value = useMemo<AuthContextType>(
    () => ({
      brandId,
      deviceDetails,
      playerDetails,
      login,
      logout,
    }),
    [brandId, deviceDetails, playerDetails]
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
