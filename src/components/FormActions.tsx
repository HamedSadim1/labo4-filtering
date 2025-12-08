import React from "react";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        className="flex-1 backdrop-blur-xl bg-pink-500/80 hover:bg-pink-500 text-white py-3 rounded-2xl transition-all duration-300 shadow-xl border border-pink-400/50 hover:scale-105"
      >
        {isEditing ? "Update Student" : "Add Student"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="backdrop-blur-xl bg-black/20 hover:bg-black/30 text-white py-3 px-6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20"
      >
        Cancel
      </button>
    </div>
  );
};

export default FormActions;
