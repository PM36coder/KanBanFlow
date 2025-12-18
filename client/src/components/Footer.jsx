import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            KanbanFlow
          </h2>
          <p className="text-sm text-gray-400">
            A modern Kanban-style task manager to organize your work,
            track progress, and stay productive.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">About</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-blue-400">Projects</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm text-gray-400 mb-2">
            Built as a full-stack MERN project.
          </p>
          <p className="text-sm text-gray-400">
            Email: <span className="text-blue-400">support@kanbanflow.dev</span>
          </p>
           <div className="mt-4 pt-4 border-t border-gray-800 text-xs">
            Made with <span className="text-red-500 animate-pulse">❤</span> by <span className="text-white">Pravesh Yadav</span>
          </div>
        </div>
        </div>
       

  

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} KanbanFlow. All rights reserved.
      </div>
    </footer>
  );
};
