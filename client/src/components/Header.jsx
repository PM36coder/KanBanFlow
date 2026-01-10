import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice/authSlice";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    dispatch(logoutUser());
    setOpen(false);
    setDropdownOpen(false);
  };

  /** BUTTON STYLE (USED EVERYWHERE) */
  const navLinkStyles = ({ isActive }) =>
    `
      px-6 py-2.5 rounded-full text-sm font-medium
      transition-transform duration-300 ease-out
      hover:-translate-y-2
      ${
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-800"
      }
    `;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/90 backdrop-blur">
      {/* TOP BAR */}
      <div className="w-full px-6 lg:px-10 py-3 flex items-center">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-white whitespace-nowrap">
          KanBanFlow
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-3 ml-auto mr-6">
          <NavLink to="/" end className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyles}>
            About
          </NavLink>
          <NavLink to="/projects" className={navLinkStyles}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={navLinkStyles}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkStyles}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {user ? (
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-transform duration-300 ease-out hover:-translate-y-2">
                <FaUserCircle className="text-lg" />
                <span>{user.name || "User"}</span>
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-transform duration-300 ease-out hover:-translate-y-2"
            >
              Login
            </NavLink>
          )}

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl text-gray-300"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden w-full bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-3">
          <NavLink to="/" end onClick={() => setOpen(false)} className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkStyles}>
            About
          </NavLink>
          <NavLink to="/projects" onClick={() => setOpen(false)} className={navLinkStyles}>
            Projects
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkStyles}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={navLinkStyles}>
              Dashboard
            </NavLink>
          )}

          {/* ✅ LOGOUT — SEPARATED & LOWER */}
          {user && (
            <div className="pt-5 mt-5 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-red-500 hover:bg-red-900/20 transition-transform duration-300 ease-out hover:-translate-y-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
