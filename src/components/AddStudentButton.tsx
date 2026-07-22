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
        aria-label="Add a new student"
        className="inline-flex items-center gap-3 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none"
      >
        <FaPlus className="text-lg" /> Add Student
      </button>
    </div>
  );
};

export default AddStudentButton;
