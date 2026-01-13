"use client";
import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/store/store";
import { AuthProvider } from "./AuthContext";
// import { ModalProvider } from "./ModalContext";
import dynamic from "next/dynamic";
import { ModalProvider } from "./ModalContext";
// import { DataProvider } from "./DataContext";

type ProviderProps = {
  children: ReactNode;
};
// const AuthModals = dynamic(() => import("@/components/AuthModals"), {
//   ssr: false,
// });
const Toast = dynamic(() => import("@/components/ui/Toast"), {
  ssr: false,
});

export default function ClientProviders({ children }: ProviderProps) {
  return (
    // <Provider store={store}>
    //    <DataProvider layoutConfig={layoutConfig}>
    //      <ModalProvider>
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>

      {/* <AuthModals /> */}
      <Toast />
    </AuthProvider>
    //      </ModalProvider>
    //    </DataProvider
    // </Provider>
  );
}
