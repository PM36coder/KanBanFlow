import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError } from "../store/slice/authSlice";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // handleChange
  const handleChange = (e) => {
    dispatch(resetError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard"); // login successful
      // console.log("LOGIN RESULT:", result.payload);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sign in to continue to <span className="text-blue-600 font-bold">KanbanFlow</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-r-lg flex items-center shadow-sm animate-pulse">
            <FaExclamationCircle className="mr-3 text-xl shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              {/* Forgot Password Link Added Here */}
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition"
              >
                Forgot password?
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 dark:text-white placeholder-gray-400"
              />
              
              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-liner-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
             {loading ? (
               <>
                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                 Logging in...
               </>
             ) : (
               "Sign In"
             )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link 
              to="/register" 
              className="font-semibold text-blue-600 hover:text-blue-500 transition hover:underline"
            >
              Create free account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};