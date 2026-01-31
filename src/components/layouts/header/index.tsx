"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "@/assets/img/logo.png";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import {
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
  Book,
  BellDot,
  Bell,
} from "lucide-react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { usePlayerDetails } from "@/utils/UserSession";

const Header = () => {
  const pathname = usePathname();
  const { openLogin, openRegister } = useModal();
  const { playerDetails, displayName, loading } = usePlayerDetails();
  const { logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loggedInNav = [
    { name: "Home", href: "/" },
    { name: "My Collaborations", href: "/my-collaborations" },
    { name: "Post", href: "/post" },
  ];

  return (
    <header className="bg-secondary relative z-50 h-[60px]">
      <nav className="px-4 h-full flex items-center justify-between">
        {/* Left */}
        <Link href="/" className="flex items-center md:gap-2">
          <Image src={logo} alt="Kavithai Kollab Logo" className="h-10 w-auto" />
          <h2 className="title text-highlight mt-4 leading-none">
            Kavithai&nbsp;Kollab
          </h2>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          {loading ? (
            <LoadingSpinner />
          ) : playerDetails ? (
            <div className="flex items-center gap-3 lg:gap-6 mt-4">
              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-2">
                {loggedInNav.map((item) => {
                  const isActive =
                    pathname === item.href &&
                    (pathname !== "/" || item.name === "Home");

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-4 h-9 flex items-center rounded-full text-sm transition-all
                        ${
                          isActive
                            ? "bg-primary text-gray-600"
                            : "text-highlight hover:bg-primary hover:text-secondary"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Notification */}
              <div className="relative h-9 flex items-center">
                <Bell
                  size={22}
                  className="text-highlight hover:text-secondary transition"
                />
                <span className="absolute top-1 -right-0.5 w-3 h-3 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  0
                </span>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="h-7 md:h-9 px-4 flex items-center gap-1 md:gap-2 text-sm text-green bg-primary rounded-full"
                >
                  <User size={16} />
                  <span className="hidden md:inline">{displayName}</span>
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-secondary border border-primary rounded-lg shadow-lg z-50">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-primary rounded-t-lg"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <Link
                      href="/my-poems"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-primary"
                    >
                      <Book size={16} />
                      My Poems
                    </Link>

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-200 hover:bg-primary rounded-b-lg"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden h-9 flex items-center">
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="text-highlight"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {mobileOpen && (
                  <div className="absolute right-4 top-[60px] w-44 bg-secondary border border-primary rounded-lg shadow-lg z-50">
                    {loggedInNav.map((item) => {
                      const isActive =
                        pathname === item.href &&
                        (pathname !== "/" || item.name === "Home");

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-1 m-1 rounded-lg text-sm
                            ${
                              isActive
                                ? "bg-primary text-gray-600"
                                : "text-highlight hover:bg-primary hover:text-secondary"
                            }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={openLogin}
                className="h-7 px-4 text-sm text-highlight border border-primary rounded-full hover:bg-primary hover:text-secondary"
              >
                Login
              </button>

              <button
                onClick={openRegister}
                className="h-7 px-4 text-sm text-green bg-primary rounded-full"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;