"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "@/assets/img/logo.png";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { usePlayerDetails } from "@/utils/UserSession";

const Header = () => {
  const pathname = usePathname();
  const { openLogin, openRegister } = useModal();
  const { playerDetails, loading } = usePlayerDetails();
  const { logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loggedInNav = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/" },
    { name: "My Collaborations", href: "/my-collaborations" },
    { name: "Post", href: "/post" },
  ];

  return (
    <header className="bg-secondary relative z-50">
      <nav className="px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Kavithai Kollab Logo"
            className="logo h-10 w-auto"
          />
          <h2 className="title text-highlight mt-4">Kavithai&nbsp;Kollab</h2>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {loading ? (
            <LoadingSpinner />
          ) : playerDetails ? (
            <div className="flex items-center gap-2 lg:gap-8">
              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-4">
                {loggedInNav.map((item) => {
                  const isActive =
                    pathname === item.href &&
                    (pathname !== "/" || item.name === "Home");

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-4 py-1.5 rounded-full text-sm
                        transition-all duration-300 ease-in-out
                        ${
                          isActive
                            ? "bg-primary text-gray-600"
                            : "text-highlight hover:bg-primary hover:text-secondary"
                        }
                      `}>
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-4 h-9 text-sm text-green bg-primary rounded-full">
                  <User size={16} />
                  {playerDetails.userName}
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-secondary border border-primary rounded-lg shadow-lg z-50">
                    <Link
                      href=""
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-primary rounded-t-lg"
                      onClick={() => setDropdownOpen(false)}>
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-primary rounded-b-lg">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="relative lg:hidden">
                {playerDetails && (
                  <button
                    onClick={() => setMobileOpen((v) => !v)}
                    className="p-2 text-highlight">
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                )}

                {/* Mobile Menu */}
                {mobileOpen && playerDetails && (
                  <div className="absolute right-0  w-44 bg-secondary border border-primary rounded-lg shadow-lg z-50">
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
                          ? "bg-app text-gray-600"
                          : "text-highlight hover:bg-primary hover:text-secondary"
                      }`}>
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={openLogin}
                className="px-4 h-7 text-sm text-highlight border border-primary rounded-full hover:bg-primary hover:text-secondary">
                Login
              </button>

              <button
                onClick={openRegister}
                className="px-4 h-7 text-sm text-green bg-primary rounded-full">
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
