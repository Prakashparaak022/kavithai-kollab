"use client";

import LoginContainer from "@/components/login";
import { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import Register from "@/components/register";
import BorderDots from "@/components/ui/BorderDots";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm overflow-y-auto py-10 p-4"
          onClick={closeModal}>
          <div
            className="relative w-full max-w-lg rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            {activeModal === "login" ? (
              <>
                {/* Border dots */}
                <BorderDots color="var(--border-secondary)" />

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-2 top-2 p-1 btn-secondary rounded-full transition">
                  <X size={15} />
                </button>
                <LoginContainer handleClose={closeModal} />
              </>
            ) : (
              <>
                {/* Border dots */}
                <BorderDots color="var(--border-secondary)" />

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-2 top-2 p-1 btn-secondary rounded-full transition">
                  <X size={15} />
                </button>
                <Register handleClose={closeModal} />
              </>
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
