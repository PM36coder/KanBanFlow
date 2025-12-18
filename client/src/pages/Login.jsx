import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import { loginUser , resetError } from "../store/slice/authSlice";



export const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

   const { loading, error } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })


  //handleChange
  const handleChange = (e) => {
    dispatch(resetError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //login

  const handleLogin = async(e)=>{
    e.preventDefault()
     const result  = await dispatch(loginUser(formData))

     if(loginUser.fulfilled.match(result)){
      navigate("/"); // login successful
      console.log("LOGIN RESULT:", result.payload);
     }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">

          {/* ERROR */}
        {error && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded flex items-center shadow-sm animate-pulse">
                     <FaExclamationCircle className="mr-2 text-xl" />
                     <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to your <span className="text-blue-600 font-semibold">KanbanFlow</span> account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Password Field (With Show/Hide Logic) */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            
            <div className="relative">
              <input
                
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-10"
              />
              
              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
             {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link 
              to="/register" 
              className="text-blue-600 font-semibold hover:text-blue-800 transition hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};