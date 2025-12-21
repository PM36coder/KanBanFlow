import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice/authSlice";
import { toggleTheme } from "../store/slice/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
  };

  return (
    <header className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
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
          <Link className="hover:text-blue-500" to="/">Home</Link>
          <Link className="hover:text-blue-500" to="/about">About</Link>
          <Link className="hover:text-blue-500" to="/contact">Contact</Link>
          <Link className="hover:text-blue-500" to="/projects">Projects</Link>
          <Link className="hover:text-blue-500" to="/services">Services</Link>

          {user ? (
            <>
              <Link className="hover:text-blue-500" to="/dashboard">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition"
            >
              Login
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
            title="Toggle theme"
          >
            {mode === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 px-4 py-4 space-y-4">
          <Link onClick={() => setOpen(false)} to="/" className="block">Home</Link>
          <Link onClick={() => setOpen(false)} to="/about" className="block">About</Link>
          <Link onClick={() => setOpen(false)} to="/services" className="block">Services</Link>
          <Link onClick={() => setOpen(false)} to="/contact" className="block">Contact</Link>
          <Link onClick={() => setOpen(false)} to="/projects" className="block">Projects</Link>

          {user ? (
            <>
              <Link onClick={() => setOpen(false)} to="/dashboard" className="block">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center"
            >
              Login
            </Link>
          )}

          {/* Theme Toggle (Mobile) */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full flex justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {mode === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      )}
    </header>
  );
};
