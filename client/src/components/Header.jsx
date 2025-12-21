import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice/authSlice";

export const Header = () => {
  const [open, setOpen] = useState(false);
 const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth)


  const handleLogout = ()=>{
    dispatch(logoutUser())
    setOpen(false)

  }


  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/" className="flex items-end">
            <span>KanBanFlo</span>

            <span className="relative">
              w
              <span className="absolute -top-1 left-1/2 translate-x-1/2 text-[11px] text-blue-500 uppercase tracking-wider font-normal">
                basic
              </span>
            </span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-400">
            Contact
          </Link>

          <Link to="/projects" className="hover:text-blue-400">
            Projects
          </Link>
          <Link to="/services" className="hover:text-blue-400">
            Services
          </Link>
          {user ? (
            <>
            <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

            <button  className="bg-blue-500 px-4 py-2 rounded-2xl transition-all  hover:bg-blue-600" onClick={handleLogout}>
            Logout
          </button> </>) : <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded-2xl transition-all  hover:bg-blue-600"
          >
            Login
          </Link>}
          
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-4">
          <Link onClick={() => setOpen(false)} to="/" className="block">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/about" className="block">
            About
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/services"
            className="block"
          >
            Services
          </Link>

          <Link onClick={() => setOpen(false)} to="/contact" className="block">
            Contact
          </Link>

          <Link onClick={() => setOpen(false)} to="/projects" className="block">
            Projects
          </Link>

        {user ? (
          <>
          <Link onClick={() => setOpen(false)} to="/dashboard" className="block">
            Dashboard
          </Link>
          <button className="block bg-blue-500 px-4 py-2 rounded-2xl transition-all  hover:bg-blue-600 w-full" onClick={handleLogout}>Logout</button></>) : <Link
            onClick={() => setOpen(false)}
            to="/login"
            className="block bg-blue-500 px-4 py-2 rounded  text-center"
          >
            Login
          </Link>}

          
        </div>
      )}
    </header>
  );
};
