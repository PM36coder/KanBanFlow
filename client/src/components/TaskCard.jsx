import { FaClock, FaTrash } from "react-icons/fa";
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
  todo: "bg-yellow-50 text-yellow-700",
  "in-progress": "bg-blue-50 text-blue-700",
  done: "bg-green-50 text-green-700",
};

export const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  // delete modal
  const [openConfirm, setOpenConfirm] = useState(false);

  // inline edit states
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const cardRef = useRef(null);

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    setOpenConfirm(false);
  };

  const handleSave = async () => {
    if (
      title.trim() === task.title &&
      description.trim() === task.description
    ) {
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

  // save on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEditing &&
        cardRef.current &&
        !cardRef.current.contains(e.target)
      ) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, title, description]);

  return (
    <>
      <Draggable
        draggableId={task._id}
        index={index}
        isDragDisabled={isEditing}
      >
        {(provided, snapshot) => (
          <div
            ref={(node) => {
              provided.innerRef(node);
              cardRef.current = node;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white p-4 rounded-xl border shadow-sm transition-all
              ${snapshot.isDragging ? "ring-2 ring-blue-400" : "hover:shadow-lg"}
              ${isEditing ? "min-h-[140px]" : ""}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              {/* STATUS DROPDOWN */}
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
                className={`text-[10px] font-bold uppercase px-2 py-1 rounded outline-none cursor-pointer
                  ${statusColorMap[task.status]}
                `}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <FaTrash
                className="text-red-400 hover:cursor-pointer"
                onClick={() => setOpenConfirm(true)}
              />
            </div>

            {/* CONTENT */}
            <div onDoubleClick={() => setIsEditing(true)}>
              {isEditing ? (
                <>
                  {/* Title */}
                  <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full mb-2 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  {/* Description */}
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className="w-full px-2 py-1 border rounded text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </>
              ) : (
                <>
                  <h1 className="font-semibold text-sm mb-1">
                    {task.title}
                  </h1>
                  <p className="text-xs text-gray-600">
                    {task.description}
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center text-xs text-gray-400 border-t pt-2 mt-3">
              <FaClock className="mr-1" />
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        )}
      </Draggable>

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
