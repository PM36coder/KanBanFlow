import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaLock, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { updateUserPassword, resetError, resetMessage } from "../store/slice/authSlice";

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { loading, error, message } = useSelector((state) => state.auth);

  // Local Form State
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Toggle Visibility State
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { password, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (newPassword.length < 8) {
      return toast.error("New password must be at least 8 characters long");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New Password and Confirm Password do not match");
    }

    // 2. Dispatch Action
    dispatch(updateUserPassword({ password, newPassword }));
  };

  //  Handle Success & Error Toasts
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetMessage());
      
     
      setTimeout(() => {
        navigate("/login" , );
      }, 2000);
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <FaKey />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Update Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showCurrent ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Enter current password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 cursor-pointer"
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* 2. New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
                placeholder="Enter new password (min 8 chars)"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 cursor-pointer"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* 3. Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            {/* Match Indicator */}
            {confirmPassword && (
              <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                {newPassword === confirmPassword ? "Password matches" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};