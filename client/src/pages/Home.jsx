import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight, FaCheckCircle, FaRocket } from "react-icons/fa";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Section */}
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Badge (Optional Decoration) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Productivity Boost
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Organize work with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              KanbanFlow
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            A simple and powerful task manager to plan, track, and finish your
            work efficiently. Stop juggling tasks and start completing them.
          </p>

          {/* Feature List (To make it attractive) */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Free for everyone
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Real-time updates
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Drag & Drop
            </div>
          </div>

          {/* Conditional Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {user ? (
              // Agar User Login hai -> Dashboard Button
              <Link
                to="/dashboard"
                className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              >
                <FaRocket /> Create Your Task <FaArrowRight />
              </Link>
            ) : (
              // Agar User Login Nahi hai -> Register/Login Buttons
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 rounded-full font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:block relative">
          {/* Decorative Blob Background */}
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
          
          <img
            src="https://imgs.search.brave.com/4vVwFNNowpHlGazL3pDJjuNmoqffz736OGBx-bZNqFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NjIzNDMyNS92ZWN0/b3Ivc2NydW0tbWFu/YWdlbWVudC1ib2Fy/ZC13b3JrZmxvdy1w/cm9qZWN0LW9uLXRh/YmxldC1wYy12ZWN0/b3ItaWxsdXN0cmF0/aW9uLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz16X0pJWHY3/YS16a21SYjRGWVhk/YnZCSFctdGVLLXpJ/TVY1Y3g3QkNxRHI4/PQ"
            alt="Kanban Illustration"
            className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};