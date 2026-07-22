import React from "react";
import { FaPlus } from "react-icons/fa";

interface AddStudentButtonProps {
  onClick: () => void;
}

// Compact primary button matching the SearchBar height in the
// unified control bar. Solid pink background (no heavy gradient —
// the Header carries the brand gradient, the cards carry the
// per-student hue). `title` documents the global `C` keyboard
// shortcut wired in Filtering.
const AddStudentButton: React.FC<AddStudentButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Add a new student"
      title="Add a new student (press C)"
      className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-5 py-3 rounded-2xl font-semibold shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
    >
      <FaPlus aria-hidden focusable={false} />
      <span>Add Student</span>
    </button>
  );
};

export default AddStudentButton;
