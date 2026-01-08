"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/img/logo.png";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, LogOut, User, LogIn, UserPlus } from "lucide-react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { usePlayerDetails } from "@/utils/UserSession";

const Header = () => {
  const { openLogin, openRegister } = useModal();
  const { playerDetails, loading } = usePlayerDetails();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loggedInNav = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "My Collaborations", href: "/collaborations" },
    { name: "Post", href: "/post" },
  ];

  return (
    <header className="bg-secondary shadow-sm">
      <nav className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Kavithai Kollab Logo"
            className="logo h-10 w-auto"
            priority
          />
          <span className="text-highlight mt-4">Kavithai&nbsp;Kollab</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2 relative">
          {loading ? (
            <LoadingSpinner />
          ) : playerDetails ? (
            <div className="flex gap-8 items-center">
              {playerDetails && (
                <div className="hidden md:flex items-center gap-8">
                  {loggedInNav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm text-highlight hover:text-green transition">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-4 h-9 text-sm text-green bg-primary rounded-full hover:opacity-90 transition">
                  <User size={16} />
                  {playerDetails?.userName}
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-secondary border border-primary rounded-lg shadow-lg z-50">
                    <Link
                      href=""
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-primary transition rounded-t-lg"
                      onClick={() => setDropdownOpen(false)}>
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-primary transition rounded-b-lg">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Login/Register Buttons with icons
            <>
              <button
                onClick={openLogin}
                className="flex items-center gap-1 px-4 h-7 text-sm text-highlight cursor-pointer border-primary rounded-full hover:bg-primary hover:text-secondary transition">
                Login
              </button>

              <button
                onClick={openRegister}
                className="flex items-center gap-1 px-4 h-7 text-sm text-green cursor-pointer bg-primary rounded-full hover:opacity-90 transition">
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
