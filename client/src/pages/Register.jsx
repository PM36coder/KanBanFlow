import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../store/slice/authSlice";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa"; 

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  
  const [data, setData] = useState({
    email: "",
    name: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    
    if(error) dispatch(resetError());
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Register logic
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Dispatch action
    const result = await dispatch(registerUser(data));

    // Sirf success hone par navigate karo
    // Error automatic Redux state me update ho jayega (extra logic nahi chahiye)
    if (registerUser.fulfilled.match(result)) {
      console.log("Registered:", result.payload);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Create Account 
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Join <span className="text-blue-600 font-semibold">KanbanFlow</span> to boost productivity
          </p>
        </div>

        {/* 🚨 ERROR ALERT BOX (Position Fixed Here) */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded flex items-center shadow-sm animate-pulse">
             <FaExclamationCircle className="mr-2 text-xl" />
             <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={data.name}
                required // HTML validation bhi add kar di
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading} // Loading ke time button disable
            className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5 mt-2 flex justify-center items-center ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              // Simple loading spinner text
              <span className="flex items-center gap-2">Creating Account...</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-blue-600 font-semibold hover:text-blue-800 transition hover:underline"
            >
              Login 
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};