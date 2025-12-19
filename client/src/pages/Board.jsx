import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/slice/taskSlice";
import { KanbanColumn } from "../components/KanbanColumn";
import { FaPlus, FaSearch } from "react-icons/fa"; // 
import { CreateTaskModal } from "../components/CreateTaskModal";

export const Board = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading your workflow...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      
      {/* Navbar / Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Project <span className="text-blue-600">Board</span>
            </h1>
            <p className="text-xs text-gray-500">Manage your tasks efficiently</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar (Visual only for now) */}
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                disabled
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg text-sm w-64 transition-all outline-none hover:cursor-not-allowed"
              />
            </div>

            {/* Add Button */}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-medium text-sm w-full md:w-auto justify-center" onClick={() => setOpen(true)}>
              <FaPlus /> New Task
            </button>
          </div>
        </div>
      </div>

      {/* Board Columns Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          <KanbanColumn title="To Do" status="todo" tasks={tasks} />
          <KanbanColumn title="In Progress" status="in-progress" tasks={tasks} />
          <KanbanColumn title="Completed" status="done" tasks={tasks} />
        </div>
      </div>
      
 {/* Modal */}
      <CreateTaskModal open={open} onClose={() => setOpen(false)} />

    </div>
  );
};