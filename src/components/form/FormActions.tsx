import React from "react";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex gap-4 pt-2">
      <button
        type="submit"
        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none"
      >
        {isEditing ? "Update Student" : "Add Student"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
      >
        Cancel
      </button>
    </div>
  );
};

export default FormActions;
