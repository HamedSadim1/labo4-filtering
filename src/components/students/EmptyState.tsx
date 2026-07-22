import React from "react";
import { FaSearch } from "react-icons/fa";
import CardSurface from "@/components/layout/CardSurface";

const EmptyState: React.FC = () => {
  return (
    <CardSurface
      darkTone="800"
      padding="p-8 sm:p-12"
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 dark:text-slate-300">
        <FaSearch className="text-3xl" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        No students found
      </h3>
      <p className="text-slate-600 dark:text-slate-300">
        Try adjusting your search criteria
      </p>
    </CardSurface>
  );
};

export default EmptyState;
