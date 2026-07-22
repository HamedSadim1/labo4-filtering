import React, { useCallback } from "react";
import {
  FaBirthdayCake,
  FaEdit,
  FaTrash,
  FaUserGraduate,
} from "react-icons/fa";
import { Student } from "../types/Student";
import { getStudentHue, getStudentInitial } from "../utils/studentUtils";

interface StudentCardProps {
  student: Student;
  index: number;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  index,
  onEdit,
  onDelete,
}) => {
  // Per-card deterministic accent: warm/cool hues curated to stay inside
  // the brand pink-purple-violet-indigo family so accents never clash with
  // the global gradient on buttons, the modal, or the page background.
  const hue = getStudentHue(student.name);

  const handleEdit = useCallback(() => {
    onEdit(student);
  }, [onEdit, student]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onEdit(student);
      }
    },
    [onEdit, student]
  );

  const handleInnerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
    },
    []
  );

  const handleEditClick = useCallback(
    (e: React.MouseEvent) => {
      handleInnerClick(e);
      onEdit(student);
    },
    [handleInnerClick, onEdit, student]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      handleInnerClick(e);
      onDelete(student.id);
    },
    [handleInnerClick, onDelete, student.id]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleEdit}
      onKeyDown={handleCardKeyDown}
      aria-label={`Edit ${student.name}`}
      // Cap the stagger at 12 cards × 50ms = 600ms so a long list does
      // not animate forever; the visual rhythm still reads as "staggered".
      style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}
      className="group relative bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 transition-all duration-300 motion-reduce:transition-none cursor-pointer animate-card overflow-hidden"
    >
      {/* Accent stripe: a thin gradient column on the left edge, hue
          derived from the student name so each card feels personalised
          without ever clashing with the global pink/purple brand. */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
        style={{
          background: `linear-gradient(to bottom, hsl(${hue} 85% 60%), hsl(${
            (hue + 32) % 360
          } 80% 52%))`,
        }}
      />

      {/* Hover overlay: pure CSS, no JS state, no mouseFollow. A soft
          radial gradient at the top-center tied to the card's accent
          hue. Cheap on touch devices (no handler), cheap on every
          keyboard, and zero state in React. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(420px circle at 50% 0%, hsl(${hue} 92% 92% / 0.35), transparent 60%)`,
        }}
      />

      {/* Header row: avatar + name on the left, action icons on the
          right. The whole card is also clickable as an "edit" target
          for power users; the inner buttons remain for explicit
          actions and to give the card proper a11y semantics. */}
      <div className="relative flex items-start gap-3 mb-4">
        <div
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 85% 60%), hsl(${
              (hue + 35) % 360
            } 78% 52%))`,
          }}
        >
          <span className="text-xl font-bold text-white drop-shadow">
            {getStudentInitial(student.name)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-semibold text-slate-900 dark:text-white truncate"
            title={student.name}
          >
            {student.name}
          </h3>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mt-0.5">
            #{student.id.slice(-6)}
          </p>
        </div>
        <div className="flex gap-1 -mr-1 -mt-1">
          <button
            type="button"
            onClick={handleEditClick}
            aria-label={`Edit ${student.name}`}
            className="p-2 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          >
            <FaEdit aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            aria-label={`Delete ${student.name}`}
            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-300 dark:hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <FaTrash aria-hidden />
          </button>
        </div>
      </div>

      {/* Meta tiles: 2-column grid of icon + label + value + unit.
          Reads as a "dashboard widget" and stays readable at narrow
          widths because each value cell is independent. */}
      <div className="relative grid grid-cols-2 gap-2">
        <MetaTile
          icon={<FaBirthdayCake aria-hidden />}
          label="Age"
          value={student.age}
          unit="yrs"
        />
        <MetaTile
          icon={<FaUserGraduate aria-hidden />}
          label="Year"
          value={student.year}
          unit="programme"
        />
      </div>
    </div>
  );
};

interface MetaTileProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
}

const MetaTile: React.FC<MetaTileProps> = ({ icon, label, value, unit }) => (
  // Block click-bubble so a tap on the meta tile does not trigger the
  // card-level "Edit" handler — the card remains clickable everywhere
  // else and the tile values stay text-selectable.
  <div
    onClick={(e) => e.stopPropagation()}
    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 rounded-xl px-3 py-2.5 cursor-default"
  >
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm text-sm">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 leading-none">
        {label}
      </p>
      <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
        {value}{" "}
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {unit}
        </span>
      </p>
    </div>
  </div>
);

export default StudentCard;
