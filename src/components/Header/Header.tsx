"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo-1.png";
import { useModal } from "@/context/ModalContext";

const Header = () => {
  const { openLogin, openRegister } = useModal();

  return (
    <header className="bg-secondary">
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Kavithai Collab Logo"
            className="logo h-15 w-auto"
            priority
          />
        </Link>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          {/* Login - Outline */}
          <button
            onClick={openLogin}
            className="px-4 h-7 text-sm text-highlight border border-[var(--bg-primary)] rounded-full hover:bg-primary hover:text-secondary transition">
            Login
          </button>

          {/* Register - Filled */}
          <button
            onClick={openRegister}
            className="px-4 h-7 inline-flex items-center justify-center text-sm text-gray-800 bg-primary rounded-full hover:opacity-90 transition">
            Register
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
