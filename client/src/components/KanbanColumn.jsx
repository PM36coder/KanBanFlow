import { TaskCard } from "./TaskCard";
import { FaCircle } from "react-icons/fa";
import { Droppable } from "@hello-pangea/dnd";

export const KanbanColumn = ({ title, status, tasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const statusColors = {
    todo: "text-yellow-500",
    "in-progress": "text-blue-500",
    done: "text-green-500",
  };

  const statusBg = {
    todo: "bg-yellow-50",
    "in-progress": "bg-blue-50",
    done: "bg-green-50",
  };

  return (
    <div className={` flex flex-col rounded-2xl border
    min-w-[280px] md:min-w-0
    ${statusBg[status]}`}>
      <div className="p-4 flex justify-between border-b">
        <div className="flex items-center gap-2">
          <FaCircle className={`text-[10px] ${statusColors[status]}`} />
          <h2 className="font-bold text-sm uppercase">{title}</h2>
        </div>
        <span className="text-xs font-bold bg-white px-2 py-1 rounded-full">
          {filteredTasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 space-y-3 flex-1 min-h-50 ${
              snapshot.isDraggingOver ? "bg-black/5" : ""
            }`}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                No tasks yet
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
