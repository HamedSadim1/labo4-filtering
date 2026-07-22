import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Student } from "@/types/Student";
import IconButton from "@/components/buttons/IconButton";

interface StudentActionButtonsProps {
  student: Student;
  /** Opens the edit-form modal. */
  onEdit: (student: Student) => void;
  /** Opens the delete-confirmation dialog. */
  onDelete: (id: string) => void;
}

/**
 * Edit + Delete icon-button row. Each button calls
 * `e.stopPropagation()` in its inline onClick so clicking the
 * action icons does not bubble up to the card-level click-to-edit
 * handler on the outer `<div role="button">`.
 *
 * Was previously part of StudentCard's monolithic JSX and relied
 * on three `useCallback` wrappers (`handleInnerClick`,
 * `handleEditClick`, `handleDeleteClick`). Extracting here
 * eliminates those callbacks and lets each IconButton own its
 * stopPropagation.
 */
const StudentActionButtons: React.FC<StudentActionButtonsProps> = ({
  student,
  onEdit,
  onDelete,
}) => (
  <div className="flex gap-1 -mr-1 -mt-1">
    <IconButton
      variant="pink"
      ariaLabel={`Edit ${student.name}`}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(student);
      }}
    >
      <FaEdit aria-hidden />
    </IconButton>
    <IconButton
      variant="red"
      ariaLabel={`Delete ${student.name}`}
      onClick={(e) => {
        e.stopPropagation();
        onDelete(student.id);
      }}
    >
      <FaTrash aria-hidden />
    </IconButton>
  </div>
);

export default StudentActionButtons;
