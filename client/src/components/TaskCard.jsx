import { FaClock, FaTrash, FaEdit } from "react-icons/fa";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { deleteTask, updateTask } from "../store/slice/taskSlice";
import { useState, useRef, useEffect } from "react";

const STATUS_OPTIONS = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];


const statusColorMap = {
  todo: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50",
  "in-progress": "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50",
  done: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50",
};

export const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    setOpenConfirm(false);
  };

  const handleSave = async () => {
    if (title.trim() === task.title && description.trim() === task.description) {
      setIsEditing(false);
      return;
    }
    await dispatch(
      updateTask({
        id: task._id,
        updates: {
          title: title.trim(),
          description: description.trim(),
        },
      })
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setTitle(task.title);
      setDescription(task.description);
      setIsEditing(false);
    }
  };

  // Save on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isEditing && cardRef.current && !cardRef.current.contains(e.target)) {
        handleSave();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, title, description]);


  return (
    <>
      <Draggable draggableId={task._id} index={index} isDragDisabled={isEditing}>
        {(provided, snapshot) => (
          <div
            ref={(node) => {
              provided.innerRef(node);
              cardRef.current = node;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              group relative bg-white w-full h-full dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 
              shadow-sm hover:shadow-md transition-all duration-200 mb-3
              ${snapshot.isDragging ? "ring-2 ring-blue-500 rotate-2 shadow-2xl z-50" : ""}
              ${isEditing ? "ring-2 ring-blue-500/50" : "hover:-translate-y-1"}
            `}
          >
            {/* Header: Status & Actions */}
            <div className="flex justify-between items-center mb-3">
              
              {/* Styled Status Badge (Select) */}
              <div className="relative">
                <select
                  value={task.status}
                  disabled={isEditing}
                  onChange={(e) =>
                    dispatch(
                      updateTask({
                        id: task._id,
                        updates: { status: e.target.value },
                      })
                    )
                  }
                  className={`appearance-none text-[10px] font-bold uppercase px-3 py-1 rounded-full border cursor-pointer outline-none transition-colors
                    ${statusColorMap[task.status]}
                  `}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value} className="bg-white text-gray-900">
                      {s.label}
                    </option>
                  ))}
                </select>
                {/* Visual Dot for Status */}
                <span className={`absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-2 w-2`}>
                   <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${task.status === 'in-progress' ? 'bg-blue-400' : 'hidden'}`}></span>
                   <span className={`relative inline-flex rounded-full h-2 w-2 ${task.status === 'in-progress' ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                </span>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-blue-500 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        title="Edit Task"
                    >
                        <FaEdit size={12} />
                    </button>
                 )}
                 <button 
                    onClick={() => setOpenConfirm(true)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    title="Delete Task"
                 >
                    <FaTrash size={12} />
                 </button>
              </div>
            </div>

            {/* Content Area */}
            <div 
                onDoubleClick={() => setIsEditing(true)} 
                className="cursor-pointer min-h-15"
            >
              {isEditing ? (
                <div className="animate-fade-in space-y-3">
                  <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-blue-300 dark:border-blue-500 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Task Title"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-blue-300 dark:border-blue-500 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition"
                    placeholder="Add a description..."
                  />
                  <div className="flex justify-end gap-2 text-xs">
                      <span className="text-gray-400">Press Esc to cancel</span>
                      <span className="text-blue-500 font-semibold">Enter to save</span>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug mb-2">
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {task.description || "No description provided."}
                  </p>
                </>
              )}
            </div>

            {/* Footer: Date & Avatar Placeholder */}
            {!isEditing && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-[11px] font-medium text-gray-400 dark:text-gray-500">
                    <FaClock className="mr-1.5" />
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    })}
                </div>
                
                {/* Mock Avatar  */}
                <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 text-white text-[10px] flex items-center justify-center font-bold shadow-sm">
                    Me
                </div>
                </div>
            )}
          </div>
        )}
      </Draggable>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};