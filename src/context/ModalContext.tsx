"use client";

import LoginContainer from "@/components/login";
import { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { CurvedDots } from "@/components/CurvedDots";
import { FrameLine } from "@/components/FrameLine";
import Register from "@/components/register";

type ModalType = "login" | "register" | null;

type ModalContextType = {
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

  return (
    <ModalContext.Provider value={{ openLogin, openRegister, closeModal }}>
      {children}

      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto py-10"
          onClick={closeModal}>
          <div
            className="relative w-full max-w-lg rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            {/* Corner dots */}
            <CurvedDots className="absolute top-0 left-0" rotate={0} />
            <CurvedDots className="absolute top-0 right-0" rotate={90} />
            <CurvedDots className="absolute bottom-0 right-0" rotate={180} />
            <CurvedDots className="absolute bottom-0 left-0" rotate={270} />

            {/* Edge connectors */}
            <FrameLine className="absolute top-[16px] left-10 right-10 h-[1px]" />
            <FrameLine className="absolute bottom-[16px] left-10 right-10 h-[1px]" />
            <FrameLine
              className="absolute left-[16px] top-10 bottom-10 w-[1px]"
              orientation="vertical"
            />
            <FrameLine
              className="absolute right-[16px] top-10 bottom-10 w-[1px]"
              orientation="vertical"
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 p-1 btn text-white hover:text-gray-500 rounded-full transition">
              <X size={15} />
            </button>
            {activeModal === "login" ? (
              <LoginContainer handleClose={closeModal} />
            ) : (
              <Register handleClose={closeModal} />
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
