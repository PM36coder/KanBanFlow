import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

export const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Hero Text */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">KanbanFlow</span>
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          KanbanFlow isn't just a task manager; it's a productivity powerhouse designed 
          for developers and teams. Inspired by industry leaders like Trello, 
          we bring simplicity and power together.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To simplify project management for everyone. Whether you are a solo freelancer 
              or a team of 10, we help you track progress effortlessly.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Us?</h3>
            <p className="text-gray-600">
              Built with modern tech, we prioritize speed, security, and a user-friendly 
              experience without the clutter of traditional enterprise software.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Powered by Modern Tech</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <FaReact className="text-5xl hover:text-blue-500 transition duration-300" title="React" />
            <SiTailwindcss className="text-5xl hover:text-cyan-400 transition duration-300" title="Tailwind" />
            <FaNodeJs className="text-5xl hover:text-green-500 transition duration-300" title="Node.js" />
            <SiExpress className="text-5xl hover:text-gray-800 transition duration-300" title="Express" />
            <SiMongodb className="text-5xl hover:text-green-600 transition duration-300" title="MongoDB" />
          </div>
        </div>

      </div>
    </section>
  );
};