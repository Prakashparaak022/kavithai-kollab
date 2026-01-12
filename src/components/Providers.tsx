"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";

const Toast = dynamic(() => import("@/components/Toast"), {
  ssr: false,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
      <Toast />
    </AuthProvider>
  );
}
