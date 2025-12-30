import { FaReact, FaNodeJs, FaDatabase, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiRedux } from "react-icons/si";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-20 pb-16 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">KanbanFlow</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
          KanbanFlow isn't just a task manager; it's a productivity powerhouse designed 
          for developers and teams. We bring the power of project management 
          without the complexity.
        </p>
      </div>

      {/* ================= MISSION & VALUES GRID ================= */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold">
              🚀
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To simplify project management for everyone. Whether you are a solo freelancer 
              or a team of 10, we help you track progress effortlessly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Us?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Built with modern tech, we prioritize speed, security, and a user-friendly 
              experience without the clutter of traditional enterprise software.
            </p>
          </div>

          {/* Card 3 (New: Open Source / Learning) */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold">
              💡
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Modern Stack</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Powered by the MERN stack. We use the latest technologies to ensure 
              your data is safe and the application runs buttery smooth.
            </p>
          </div>

        </div>
      </div>

      {/* ================= TECH STACK SECTION ================= */}
      <div className="bg-white dark:bg-gray-800 py-20 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Built with <span className="text-blue-600">Passion</span> & <span className="text-purple-600">Code</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-10">
            <TechIcon icon={<SiMongodb />} name="MongoDB" color="hover:text-green-500" />
            <TechIcon icon={<SiExpress />} name="Express" color="hover:text-gray-600 dark:hover:text-gray-300" />
            <TechIcon icon={<FaReact />} name="React" color="hover:text-blue-400" />
            <TechIcon icon={<FaNodeJs />} name="Node.js" color="hover:text-green-600" />
            <TechIcon icon={<SiRedux />} name="Redux" color="hover:text-purple-600" />
            <TechIcon icon={<SiTailwindcss />} name="Tailwind" color="hover:text-cyan-400" />
          </div>
        </div>
      </div>

      {/* ================= CREATOR / FOOTER CTA ================= */}
      <div className="py-20 text-center px-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Ready to get organized?
        </h2>
        <Link 
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg hover:shadow-blue-500/30"
        >
          Get Started for Free
        </Link>
        
        {/* Social Links (Optional) */}
        <div className="mt-10 flex justify-center gap-6 text-gray-400">
            <a href="https://github.com/PM36coder" target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition text-2xl"><FaGithub /></a>
            <a href="www.linkedin.com/in/pravesh-yadav-25bb5233a" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition text-2xl"><FaLinkedin /></a>
        </div>
      </div>

    </div>
  );
};

// Helper Component for Icons to keep code clean
const TechIcon = ({ icon, name, color }) => (
  <div className={`flex flex-col items-center gap-2 group cursor-pointer`}>
    <div className={`text-6xl text-gray-300 dark:text-gray-600 transition duration-300 transform group-hover:scale-110 ${color}`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition">
      {name}
    </span>
  </div>
);