import React from "react";
import { FaPlus } from "react-icons/fa";

interface AddStudentButtonProps {
  onClick: () => void;
}

const AddStudentButton: React.FC<AddStudentButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={onClick}
        className="backdrop-blur-xl bg-linear-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/90 hover:to-pink-700/90 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-2xl border border-purple-500/30 hover:scale-105 hover:shadow-3xl"
      >
        <FaPlus className="text-xl" /> Add Student
      </button>
    </div>
  );
};

export default AddStudentButton;
