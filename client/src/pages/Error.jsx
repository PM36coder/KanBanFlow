import { useRouteError, Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

export const Error = () => {
  const error = useRouteError(); 
  const navigate = useNavigate();

  
  console.error(error);

  //  error type for UI customization
  const isNotFound = error.status === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-6 transition-colors duration-300">
      <div className="max-w-lg w-full text-center animate-fade-in-up">
        
        {/* Icon Container with Pulse Effect */}
        <div className="relative inline-block mb-8">
          <div className={`absolute inset-0 rounded-full opacity-20 animate-ping ${isNotFound ? 'bg-blue-500' : 'bg-red-500'}`}></div>
          <div className={`relative w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl ${
            isNotFound 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
             {isNotFound ? <span className="font-bold text-3xl">404</span> : <FaExclamationTriangle />}
          </div>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          {isNotFound ? "Page Not Found" : "Something went wrong"}
        </h1>

        {/* Dynamic Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto leading-relaxed">
          {isNotFound
            ? "Sorry, the page you are looking for doesn't exist or has been moved to another URL."
            : "An unexpected error occurred. Our team has been notified and is working on the fix."}
        </p>

        {/* Technical Error Details (Styled as Code Block) */}
        {(error.statusText || error.message) && (
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left p-4 rounded-xl text-sm mb-8 font-mono overflow-auto shadow-inner mx-auto max-w-sm">
            <p className="text-red-500 font-bold mb-1">// Error Details:</p>
            <p className="text-gray-700 dark:text-gray-300 wrap-break-word">
              {error.statusText || error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold text-gray-700 dark:text-gray-200"
          >
            <FaArrowLeft /> Go Back
          </button>

          <Link
            to="/"
            replace
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition font-semibold shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
      
      {/* Optional: Footer Support Link */}
      <div className="mt-12 text-sm text-gray-400">
        Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact Support</Link>
      </div>
    </div>
  );
};