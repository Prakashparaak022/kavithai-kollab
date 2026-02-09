"use client";

import { X } from "lucide-react";
import LoginContainer from "@/components/login";
import Register from "@/components/register";
import BorderDots from "@/components/ui/BorderDots";
import { useModal } from "./ModalContext";

export default function AuthModals() {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm overflow-y-auto py-10 p-4"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <BorderDots color="var(--border-secondary)" />

        <button
          onClick={closeModal}
          className="absolute right-2 top-2 p-1 btn-secondary rounded-full transition"
        >
          <X size={15} />
        </button>

        {activeModal === "login" ? (
          <LoginContainer handleClose={closeModal} />
        ) : (
          <Register handleClose={closeModal} />
        )}
      </div>
    </div>
  );
}
