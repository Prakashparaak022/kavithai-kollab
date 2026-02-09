"use client";

import AuthModals from "@/context/AuthModals";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type ModalType = "login" | "register" | null;

type ModalContextType = {
  activeModal: ModalType;
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  const value = useMemo(
    () => ({
      activeModal,
      openLogin,
      openRegister,
      closeModal,
    }),
    [activeModal],
  );

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
        <AuthModals />
      </ModalContext.Provider>
    </>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
