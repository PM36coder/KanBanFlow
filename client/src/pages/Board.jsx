import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../store/slice/taskSlice";
import { KanbanColumn } from "../components/KanbanColumn";
import { FaPlus, FaSearch, FaFilter, FaUserFriends } from "react-icons/fa";
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

  // --- LOADING STATE (Stylized) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-4 animate-pulse">Syncing workflow...</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
        
        {/*  HEADER TOOLBAR  */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              
              {/* Left: Title & Meta */}
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Board</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Workspace Active • {tasks.length} Tasks
                </p>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                
                {/* Search Bar */}
                <div className="relative flex-1 md:w-64 group">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    disabled
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all cursor-not-allowed opacity-70"
                  />
                </div>

                {/* Team Avatars */}
                <div className="hidden lg:flex items-center -space-x-2 mr-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs text-white border-2 border-white dark:border-gray-800 font-bold">JD</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white border-2 border-white dark:border-gray-800 font-bold">AK</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800 hover:bg-gray-300 cursor-pointer">
                    <FaUserFriends />
                  </div>
                </div>

                {/* Filter Button */}
                <button disabled className="p-2.5 cursor-not-allowed  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition border border-gray-200 dark:border-gray-600 hidden sm:block">
                    <FaFilter />
                </button>

                {/* Create Button */}
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-medium whitespace-nowrap"
                >
                  <FaPlus className="text-sm" /> 
                  <span className="hidden sm:inline">New Task</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KANBAN COLUMNS */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <div className="max-w-[1600px] mx-auto h-full">
            
            {tasks.length === 0 ? (
              <EmptyBoard onCreate={() => setOpen(true)} />
            ) : (
              // Grid Layout for Desktop, Horizontal Scroll for Mobile
              <div className="flex flex-col md:grid md:grid-cols-3 gap-6 h-full min-w-[300px]">
                <KanbanColumn title="To Do" status="todo" tasks={tasks} />
                <KanbanColumn title="In Progress" status="in-progress" tasks={tasks} />
                <KanbanColumn title="Completed" status="done" tasks={tasks} />
              </div>
            )}

          </div>
        </div>

        {/* Modal */}
        <CreateTaskModal open={open} onClose={() => setOpen(false)} />
      </div>
    </DragDropContext>
  );
};