import { useRouteError, Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

export const Error = () => {
  const error = useRouteError(); // React Router se error catch karega
  const navigate = useNavigate();

  // Console me error dikhana jaruri hai debugging ke liye
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-6">
      <div className="max-w-md text-center">
        
        {/* Icon */}
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-6 animate-bounce" />

        {/* Dynamic Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          {error.status === 404 ? "Page Not Found" : "Something went wrong"}
        </h1>

        {/* Dynamic Message */}
        <p className="text-gray-600 mb-8 text-lg">
          {error.status === 404
            ? "Sorry, the page you are looking for doesn't exist or has been moved."
            : "An unexpected error occurred. Our team has been notified."}
        </p>

        {/* Error Details (Only for Dev mode - Optional) */}
        {error.statusText || error.message ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-6 font-mono">
            Error: {error.statusText || error.message}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            <FaArrowLeft /> Go Back
          </button>

          <Link
            to="/"
            replace
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};