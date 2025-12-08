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
    <div className="backdrop-blur-xl bg-black/20 dark:bg-black/30 rounded-3xl p-6 hover:bg-black/25 dark:hover:bg-black/40 transition-all duration-300 shadow-2xl border border-white/10 dark:border-white/5 hover:scale-105 hover:shadow-3xl group">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-linear-to-br from-pink-400 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">
            {getStudentInitial(student.name)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">
          {student.name}
        </h3>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-white/80">
          <span className="font-medium">Age:</span> {student.age}
        </p>
        <p className="text-white/80">
          <span className="font-medium">Year:</span> {student.year}
        </p>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onEdit(student)}
          className="flex-1 backdrop-blur-sm bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 px-4 py-2 rounded-xl transition-all duration-300 border border-pink-400/30 hover:border-pink-400/50"
        >
          <FaEdit className="inline mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="flex-1 backdrop-blur-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all duration-300 border border-red-400/30 hover:border-red-400/50"
        >
          <FaTrash className="inline mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
