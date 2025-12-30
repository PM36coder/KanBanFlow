import { FaGithub, FaExternalLinkAlt, FaLaptopCode, FaShoppingCart } from "react-icons/fa";

export const Projects = () => {
  const projects = [
    {
      title: "KanbanFlow",
      desc: "A full-stack Kanban-style task manager built with MERN stack. Features drag-and-drop tasks, secure authentication, and real-time updates.",
      tags: ["React", "Redux", "Node.js", "MongoDB", "Tailwind"],
      status: "Live",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      gradient: "from-blue-500 to-indigo-600",
      icon: <FaLaptopCode />,
      // Add links here for dynamic routing
      demoLink: "/login", // Or full URL: https://...
      repoLink: "https://github.com/PM36coder/KanBanFlow"
    },
    {
      title: "E-Commerce Dashboard",
      desc: "Admin dashboard for managing products, orders, and users. Includes chart visualization for sales data and inventory management.",
      tags: ["React", "Redux", "Node.js", "MongoDB", "Tailwind"],
      status: "Coming Soon",
      statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      gradient: "from-purple-500 to-pink-600",
      icon: <FaShoppingCart />,
      demoLink: "#",
      repoLink: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION  */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Masterpieces</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore the applications we've built. From intuitive task management tools 
            to complex data-driven dashboards, we build software that matters.
          </p>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              
              {/* Card Image / Header Area */}
              <div className={`h-52 bg-linear-to-r ${project.gradient} flex items-center justify-center relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 bg-white opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                <div className="text-white text-7xl opacity-90 transform group-hover:scale-110 group-hover:rotate-3 transition duration-500 drop-shadow-lg">
                  {project.icon}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed h-20 line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium border border-gray-200 dark:border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* --- FIX IS HERE: Action Buttons --- */}
                {/* We use 'mt-auto' to push buttons to the bottom if content varies in height */}
                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  
                  {/* Live Demo Button */}
                  <a 
                    href={project.demoLink}
                    target={project.demoLink.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg text-center"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>

                  {/* Source Code Button */}
                  <a 
                    href={project.repoLink}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition text-center"
                  >
                    <FaGithub /> Source Code
                  </a>
                  
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
            <a 
              href="https://github.com/PM36coder" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center justify-center gap-2 mx-auto"
            >
                View GitHub Profile <FaGithub />
            </a>
        </div>

      </div>
    </div>
  );
};