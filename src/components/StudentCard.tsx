import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Student } from "../types/Student";
import { getStudentInitial } from "../utils/studentUtils";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-linear-to-br from-pink-400 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg ring-4 ring-pink-100 dark:ring-purple-900/30">
          <span className="text-2xl font-bold text-white">
            {getStudentInitial(student.name)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
          {student.name}
        </h3>
      </div>
      <div className="flex justify-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
          Age: {student.age}
        </span>
        <span className="inline-flex items-center gap-1 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium">
          Year: {student.year}
        </span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(student)}
          aria-label={`Edit ${student.name}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-500/20 border border-pink-200 dark:border-pink-500/30 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          aria-label={`Delete ${student.name}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
