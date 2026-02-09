"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthPlayerLoading from "@/context/AuthPlayerLoading";

const Toast = dynamic(() => import("@/components/ui/Toast"), {
  ssr: false,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthPlayerLoading />
        <ModalProvider>
          {children}
          <Toast />
        </ModalProvider>
      </AuthProvider>
    </Provider>
  );
}
