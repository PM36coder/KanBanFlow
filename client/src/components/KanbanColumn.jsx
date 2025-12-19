import { TaskCard } from './TaskCard';
import { FaCircle } from "react-icons/fa";

export const KanbanColumn = ({ title, status, tasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  // Status ke hisab se colors define kiye
  const statusColors = {
    todo: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    done: "bg-green-500",
  };

  const statusBg = {
    todo: "bg-yellow-50",
    "in-progress": "bg-blue-50",
    done: "bg-green-50",
  };

  return (
    <div className={`flex flex-col h-full rounded-2xl ${statusBg[status] || "bg-gray-50"} border border-gray-200`}>
      
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200/50">
        <div className="flex items-center gap-2">
          <FaCircle className={`text-[10px] ${statusColors[status] || "text-gray-400"}`} />
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-sm">
            {title}
          </h2>
        </div>
        <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
          {filteredTasks.length}
        </span>
      </div>

      {/* Task List Area */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto min-h-[200px]">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        ) : (
          // Empty State
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg py-8">
            <p>No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};