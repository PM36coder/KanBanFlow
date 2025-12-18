import { useSelector } from "react-redux";

export const Contact = () => {

   const {user} = useSelector((state)=> state.auth)

   if(!user){
    return (
      <div className="flex items-center justify-center h-screen ">
        <h1 className="text-emerald-500 text-center  text-2xl ">Please Login First</h1>
      </div>
      
    )
   }
  return (
    <section className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
};
