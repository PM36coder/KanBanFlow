import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaGithub, FaLinkedin, } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) {
        return toast.error("Please fill all fields");
    }

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/*  HEADER */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? We'd love to hear from you.
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/*  LEFT: CONTACT INFO  */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Card 1: Email */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">support@kanbanflow.com</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">hello@company.com</p>
              </div>
            </div>

            {/* Contact Card 2: Location */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  123 Tech Street, Silicon Valley, <br /> California, USA
                </p>
              </div>
            </div>

            {/* Contact Card 3: Phone */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">+1 (555) 000-1234</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 000-5678</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex gap-4 justify-center lg:justify-start">
                <SocialBtn icon={<FaGithub />} link="https://github.com/PM36coder" />
                <SocialBtn icon={<FaLinkedin />} link="www.linkedin.com/in/pravesh-yadav-25bb5233a" />
               
            </div>

          </div>

          {/*  RIGHT SIDE FORM  */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-900 dark:text-white"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                    <>Sending...</>
                ) : (
                    <>Send Message <FaPaperPlane /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component for Social Buttons
const SocialBtn = ({ icon, link }) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
    >
        {icon}
    </a>
);