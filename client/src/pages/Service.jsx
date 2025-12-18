import { FaTasks, FaShieldAlt, FaMobileAlt, FaBolt, FaUsers, FaChartLine } from "react-icons/fa";

export const Service = () => {
  const services = [
    { icon: <FaTasks />, title: "Task Management", desc: "Organize tasks into boards and columns using efficient Kanban workflows." },
    { icon: <FaShieldAlt />, title: "Secure Auth", desc: "Enterprise-grade security with JWT authentication and encrypted data." },
    { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Access your boards from any device—mobile, tablet, or desktop." },
    { icon: <FaBolt />, title: "Fast Performance", desc: "Optimized backend and frontend ensuring zero lag interactions." },
    { icon: <FaUsers />, title: "Team Collaboration", desc: "Invite members and collaborate on projects in real-time." },
    { icon: <FaChartLine />, title: "Analytics", desc: "Track progress with visual charts and deadline reminders." },
  ];

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">What We Offer</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Premium Services
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200 transform hover:-translate-y-2 cursor-default"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};