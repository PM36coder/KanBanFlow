import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../store/slice/taskSlice";
import { KanbanColumn } from "../components/KanbanColumn";
import { FaPlus, FaSearch } from "react-icons/fa";
import { EmptyBoard } from "../components/EmptyBoard";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { DragDropContext } from "@hello-pangea/dnd";

export const Board = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    dispatch(
      updateTask({
        id: draggableId,
        updates: { status: destination.droppableId },
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading your workflow...</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">
                Project <span className="text-blue-600">Board</span>
              </h1>
              <p className="text-xs text-gray-500">Manage your tasks efficiently</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative hidden md:block">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  disabled
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 hover:cursor-not-allowed"
                />
              </div>

              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md"
              >
                <FaPlus /> New Task
              </button>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {tasks.length === 0 ? (
  <EmptyBoard onCreate={() => setOpen(true)} />
) : (
  <div
    className="
      flex gap-4
      overflow-x-auto
      md:grid md:grid-cols-3
      md:overflow-x-visible
      pb-4
    "
  >
    <KanbanColumn title="To Do" status="todo" tasks={tasks} />
    <KanbanColumn title="In Progress" status="in-progress" tasks={tasks} />
    <KanbanColumn title="Completed" status="done" tasks={tasks} />
  </div>
)}

        </div>

        <CreateTaskModal open={open} onClose={() => setOpen(false)} />
      </div>
    </DragDropContext>
  );
};
