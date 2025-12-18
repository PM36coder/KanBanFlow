import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

export const Projects = () => {
  const projects = [
    {
      title: "KanbanFlow",
      desc: "A full-stack Kanban-style task manager built with MERN stack. Features drag-and-drop, auth, and analytics.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind"],
      status: "Live",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "E-Commerce Dashboard",
      desc: "Admin dashboard for managing products, orders, and users with real-time data visualization.",
      tags: ["Next.js", "TypeScript", "Prisma"],
      status: "Coming Soon",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-blue-600">Projects</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the applications we've built. From task management to complex data systems.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 group">
              
              {/* Fake Image Placeholder with Gradient */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FaCode className="text-white text-6xl opacity-50 group-hover:scale-110 transition duration-300" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {project.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.color}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-black font-semibold transition">
                    <FaGithub /> Code
                  </button>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition">
                    <FaExternalLinkAlt /> Live Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};