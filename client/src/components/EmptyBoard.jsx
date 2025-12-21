import { FaPlus } from "react-icons/fa";

export const EmptyBoard = ({ onCreate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to KanbanFlow 🚀
        </h2>
        <p className="text-gray-500 mb-6">
          You don’t have any tasks yet.  
          Create your first task to start managing your workflow.
        </p>

        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow"
        >
          <FaPlus /> Create First Task
        </button>
      </div>
    </div>
  );
};
