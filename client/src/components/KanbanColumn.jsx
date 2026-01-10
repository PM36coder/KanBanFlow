import { TaskCard } from "./TaskCard";
import { FaCircle, FaPlus } from "react-icons/fa";
import { Droppable } from "@hello-pangea/dnd";

export const KanbanColumn = ({ title, status, tasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  // ✨ Modern Color Config (Light + Dark Mode Support)
  const columnStyles = {
    todo: {
      borderTop: "border-t-amber-400",
      bg: "bg-amber-50/50 dark:bg-gray-800/50",
      text: "text-amber-700 dark:text-amber-400",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      icon: "text-amber-400"
    },
    "in-progress": {
      borderTop: "border-t-blue-400",
      bg: "bg-blue-50/50 dark:bg-gray-800/50",
      text: "text-blue-700 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      icon: "text-blue-400"
    },
    done: {
      borderTop: "border-t-emerald-400",
      bg: "bg-emerald-50/50 dark:bg-gray-800/50",
      text: "text-emerald-700 dark:text-emerald-400",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      icon: "text-emerald-400"
    },
  };

  const style = columnStyles[status];

  return (
    <div 
      className={`
        flex flex-col h-full rounded-xl border border-gray-200 dark:border-gray-700
        min-w-70 md:min-w-[320px] transition-colors duration-300
        ${style.bg} border-t-4 ${style.borderTop}
      `}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2.5">
          <FaCircle className={`text-[8px] ${style.icon}`} />
          <h2 className={`font-bold text-sm uppercase tracking-wide ${style.text}`}>
            {title}
          </h2>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
          {filteredTasks.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 p-3 flex flex-col gap-3 space-y-3 overflow-y-auto max-h-80 md:max-h-full pr-2 custom-scrollbar min-h-37.5 transition-colors duration-200 rounded-b-xl
              ${snapshot.isDraggingOver ? "bg-gray-100/80 dark:bg-gray-700/50 ring-2 ring-inset ring-blue-400/30" : ""}
            `}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))
            ) : (
              //  Styled Empty State
              <div className="h-32 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl m-1">
                <span className="text-sm font-medium">No tasks yet</span>
                <span className="text-xs mt-1 opacity-70">Drop items here</span>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};