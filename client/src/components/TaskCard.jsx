import { FaClock, FaEllipsisH } from "react-icons/fa";

export const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
      
      {/* Header: Label & Menu */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-600 uppercase tracking-wide">
          Task
        </span>
        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition">
          <FaEllipsisH />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-gray-800 font-semibold text-sm leading-snug mb-3">
        {task.title}
      </h3>

      {/* Footer: Date/Meta (Dummy for look) */}
      <div className="flex items-center text-gray-400 text-xs border-t border-gray-100 pt-3 mt-auto">
        <FaClock className="mr-1" />
        <span>Dec 18</span>
      </div>
    </div>
  );
};