import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../store/slice/taskSlice"; 
import { FaTimes, FaLayerGroup } from "react-icons/fa"; // Icons added

export const CreateTaskModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // --- LOGIC (UNCHANGED) ---
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const result = await dispatch(
      createTask({ title, description })
    );

    if (createTask.fulfilled.match(result)) {
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur Effect */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all scale-100 animate-fade-in-up border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <FaLayerGroup />
            </div>
            <h2 className="text-xl font-bold">Create New Task</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design Homepage UI"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Description <span className="text-xs font-normal text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, acceptance criteria, or notes..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Footer / Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};