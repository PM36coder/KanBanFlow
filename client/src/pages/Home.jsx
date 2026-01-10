import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight, FaRocket, FaTasks, FaChartLine, FaUsers, FaCheckCircle } from "react-icons/fa";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            v2.0 is Live Now
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
            Manage projects with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              KanbanFlow
            </span>
          </h1>

          {/* Sub headline */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The simplest way to organize your work. Visualize tasks, limit work-in-progress, 
            and maximize efficiency without the clutter.
          </p>

          {/* CTA Buttons (User Logic) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-500/30 hover:scale-105 transition-all duration-300"
              >
                <FaRocket /> Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  Start for Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-full font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl bg-gray-900 overflow-hidden">
             {/* Fake Browser Header */}
             <div className="h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             {/* Image */}
             <img 
               src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2839&auto=format&fit=crop" 
               alt="Dashboard Preview" 
               className="w-full h-auto opacity-90 hover:opacity-100 transition duration-500"
             />
          </div>
        </div>
      </section>

      {/*  TRUST SECTION */}
      <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 ">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">10k+</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
            </div>
            <div className="space-y-1 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">500k+</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
            </div>
            <div className="space-y-1 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">99.9%</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Uptime</p>
            </div>
            <div className="space-y-1 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">User Rating</p>
            </div>
        </div>
      </section>

      {/* FEATURES SECTION  */}
      <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to ship faster</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      KanbanFlow provides all the essential tools to help your team collaborate and hit deadlines without the stress.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-6">
                          <FaTasks />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Drag & Drop Boards</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                          Intuitively organize tasks with our smooth Kanban boards. Customize columns to match your workflow perfectly.
                      </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center text-xl mb-6">
                          <FaUsers />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Team Collaboration</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                          Invite team members, assign tasks, and comment in real-time. Keep everyone on the same page, effortlessly.
                      </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center text-xl mb-6">
                          <FaChartLine />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Productivity Analytics</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                          Track progress with built-in reports. See what's done, what's pending, and optimize your team's velocity.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/*  BOTTOM CTA  */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to boost your productivity?</h2>
              <p className="text-blue-100 text-lg mb-8">
                  Join thousands of teams using KanbanFlow to do their best work.
              </p>
              {!user && (
                  <Link 
                    to="/register" 
                    className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition hover:scale-105"
                  >
                    Get Started for Free <FaArrowRight />
                  </Link>
              )}
          </div>
      </section>

    </div>
  );
};