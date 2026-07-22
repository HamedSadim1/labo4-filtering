import React, { useCallback } from "react";
import { FaBirthdayCake, FaUserGraduate } from "react-icons/fa";
import { Student } from "@/types/Student";
import { getStudentHue } from "@/utils/studentUtils";
import { STAGGER_CAP_INDEX, STAGGER_STEP_MS } from "@/constants/animations";
import AccentStripe from "./AccentStripe";
import HoverOverlay from "./HoverOverlay";
import StudentAvatar from "./StudentAvatar";
import StudentNameId from "./StudentNameId";
import StudentActionButtons from "./StudentActionButtons";
import MetaTile from "./MetaTile";

interface StudentCardProps {
  student: Student;
  index: number;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

/**
 * Orchestrator for a single student card in the grid. Composition of
 * six subcomponents + two event handlers. Kept deliberately focused
 * on layout + behaviour; each subcomponent owns one visual concern.
 *
 * Behaviour notes:
 * - The whole card is clickable as an "edit" shortcut (onClick via
 *   handleEdit) for power users.
 * - Enter / Space also open edit for keyboard users.
 * - Inner action buttons (StudentActionButtons) call
 *   stopPropagation so they never trigger the card-level edit.
 * - Meta tiles also stopPropagation so the stat values stay
 *   text-selectable.
 */
const StudentCard: React.FC<StudentCardProps> = ({
  student,
  index,
  onEdit,
  onDelete,
}) => {
  // Per-card deterministic accent hue — used by the avatar, the
  // accent stripe, and the hover overlay simultaneously.
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

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleEdit}
      onKeyDown={handleCardKeyDown}
      aria-label={`Edit ${student.name}`}
      style={{
        animationDelay: `${Math.min(index, STAGGER_CAP_INDEX) * STAGGER_STEP_MS}ms`,
      }}
      className="group relative bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 transition-all duration-300 motion-reduce:transition-none cursor-pointer animate-card overflow-hidden"
    >
      <AccentStripe hue={hue} />
      <HoverOverlay hue={hue} />

      <div className="relative flex items-start gap-3 mb-4">
        <StudentAvatar hue={hue} name={student.name} />
        <StudentNameId name={student.name} id={student.id} />
        <StudentActionButtons
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <div className="relative grid grid-cols-2 gap-2">
        <MetaTile
          icon={<FaBirthdayCake aria-hidden />}
          label="Age"
          value={student.age}
          unit="yrs"
          description={`${student.age} yrs`}
        />
        <MetaTile
          icon={<FaUserGraduate aria-hidden />}
          label="Year"
          value={student.year}
          unit="programme"
          description={`${student.year} programme`}
        />
      </div>
    </div>
  );
};

export default StudentCard;
