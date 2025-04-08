import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Cek apakah path-nya adalah login atau register
  if (
    location.pathname === "/admin/login" ||
    location.pathname === "/admin/register"
  ) {
    return null; // Tidak tampilkan Navbar pada halaman login/register
  }
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin logout?");
    if (isConfirmed) {
      logout();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Title on the left */}

          {/* Menu on the right */}
          <div className="flex justify-between items-center w-full">
            {/* Title on the left */}
            <div className="shrink-0">
              <span className="font-bold text-2xl text-white">
                CariKerjamu.xyz
              </span>
            </div>

            {/* Menu items and profile on the right */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-white"
                  }
                >
                  Home
                </NavLink>
                {isAuthenticated && (
                  <>
                    <NavLink
                      to={"/admin/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          : "rounded-md px-3 py-2 text-sm font-medium text-white"
                      }
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to={"/dashboard/list-job-vacancy"}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          : "rounded-md px-3 py-2 text-sm font-medium text-white"
                      }
                    >
                      Data Pekerjaan
                    </NavLink>
                  </>
                )}
              </div>

              {/* Profile menu */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleProfileMenu}
                    className="relative flex items-center justify-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                    id="user-menu-button"
                    aria-expanded={profileMenuOpen ? "true" : "false"}
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="User Profile"
                    />
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        onClick={handleLogout}
                        className="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              {/* Hamburger Icon (Menu icon) */}
              <svg
                className={`block size-6 ${
                  mobileMenuOpen ? "hidden" : "block"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {/* "X" Icon (Close icon) */}
              <svg
                className={`block size-6 ${
                  mobileMenuOpen ? "block" : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 flex flex-col">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                : "rounded-md px-3 py-2 text-sm font-medium text-white"
            }
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to={"/admin/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    : "rounded-md px-3 py-2 text-sm font-medium text-white"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/dashboard/list-job-vacancy"}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    : "rounded-md px-3 py-2 text-sm font-medium text-white"
                }
              >
                Data Pekerjaan
              </NavLink>

              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      className="size-10 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3"></div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5"></span>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <a
                    onClick={handleLogout}
                    className="block hover:cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
