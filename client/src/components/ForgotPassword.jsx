import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaEnvelope, FaLock, FaKey, FaCheckCircle } from "react-icons/fa";
import { sendOtp, resetPassword, resetError, resetMessage } from "../store/slice/authSlice";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { loading, error, message } = useSelector((state) => state.auth);

  // Local UI State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
     
    }
  }, [error, message, dispatch]);




  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter email");

    
    const result = await dispatch(sendOtp(email));

    // if fulfilled, move to next step
    if (sendOtp.fulfilled.match(result)) {
      setStep(2); // ✅ Valid place for State Update
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Enter valid 6-digit OTP");
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.error("All fields required");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    
    // API Call
    const result = await dispatch(resetPassword({ email, otp, newPassword }));

    // Success par Redirect
    if (resetPassword.fulfilled.match(result)) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
            {step === 1 && <FaEnvelope />}
            {step === 2 && <FaKey />}
            {step === 3 && <FaLock />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Enter OTP"}
            {step === 3 && "Reset Password"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {step === 1 && "Enter your email to receive a reset code."}
            {step === 2 && `Code sent to ${email}`}
            {step === 3 && "Create a strong new password."}
          </p>
        </div>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <div className="text-center">
                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2">
                    <FaArrowLeft /> Back to Login
                </Link>
            </div>
          </form>
        )}

        {/*  STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <input
              type="text"
              maxLength={6}
              required
              className="w-full text-center text-3xl tracking-widest py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Verify & Proceed
            </button>
            <div className="text-center flex justify-between px-2">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-blue-600">Change Email</button>
                <button type="button" onClick={handleSendOtp} disabled={loading} className="text-sm text-blue-600 hover:underline">Resend OTP</button>
            </div>
          </form>
        )}

        {/*  STEP 3: NEW PASSWORD  */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="relative">
              <FaCheckCircle className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button type="button" onClick={() => setStep(2)} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-2">Back</button>
          </form>
        )}
      </div>
    </div>
  );
};