import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice/authSlice";

import {  FaUserCircle, FaLock, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export const Header = () => {
  const [open, setOpen] = useState(false);
  
 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
    setDropdownOpen(false); 
  };

  const navLinkStyles = ({ isActive }) => {
    return `transition duration-200 ${
      isActive
        ? "text-blue-600 font-bold dark:text-blue-400"
        : "text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
    }`;
  };

  return (
    <header className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/" className="flex items-end">
            <span>KanBanFlo</span>
            <span className="relative ml-1">
              w
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[11px] text-blue-500 uppercase tracking-wider font-normal">
                basic
              </span>
            </span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" end className={navLinkStyles}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyles}>About</NavLink>
          <NavLink to="/projects" className={navLinkStyles}>Projects</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkStyles}>
                Dashboard
              </NavLink>

              
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {/* Profile Trigger Button */}
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <FaUserCircle className="text-xl text-gray-600 dark:text-gray-300" />
                  <span className="font-medium text-sm">{user.name || "User"}</span>
                  <FaChevronDown className={`text-xs transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-fade-in-up">
                    
                    {/* User Info (Optional Header inside dropdown) */}
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>

                    {/* Update Password Link */}
                    <Link 
                      to="/update-password" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition"
                    >
                      <FaLock className="text-xs" /> Update Password
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <FaSignOutAlt className="text-xs" /> Logout
                    </button>
                  </div>
                )}
              </div>
              

            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-2xl transition shadow-md ${
                  isActive
                    ? "bg-blue-700 text-white ring-2 ring-blue-300"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`
              }
            >
              Login
            </NavLink>
          )}

        
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      
      {open && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 px-4 py-4 space-y-3 shadow-inner">
          <NavLink onClick={() => setOpen(false)} to="/" end className="block py-2">Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/projects" className="block py-2">Projects</NavLink>

          {user ? (
            <>
              <NavLink onClick={() => setOpen(false)} to="/dashboard" className="block py-2 font-bold text-blue-600">
                Dashboard
              </NavLink>
              
             
              <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                <p className="text-xs text-gray-500 mb-2">Account ({user.name})</p>
                <Link onClick={() => setOpen(false)} to="/update-password" class="block py-2 flex items-center gap-2">
                   <FaLock /> Update Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/login" className="block bg-blue-600 text-white px-4 py-2 rounded text-center">
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};