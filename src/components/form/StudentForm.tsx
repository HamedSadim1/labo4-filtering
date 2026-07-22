import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Student, StudentFormData } from "../../types/Student";
import FormActions from "./FormActions";
import FormField from "./FormField";

interface StudentFormProps {
  student: Student | null;
  onSave: (formData: StudentFormData) => void;
  onClose: () => void;
}

const initialFormData: StudentFormData = {
  name: "",
  age: "",
  year: "",
};

const validatePositiveNumber = (
  label: string,
  value: string
): string | undefined => {
  if (!value.trim()) {
    return `${label} is required`;
  }
  if (Number(value) <= 0) {
    return `${label} must be greater than 0`;
  }
  return undefined;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        age: student.age.toString(),
        year: student.year.toString(),
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [student]);

  useLayoutEffect(() => {
    // Capture the trigger element so we can restore focus on close
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;

    // Move focus into the dialog when it opens so Tab cycling is anchored here.
    const dialog = dialogRef.current;
    if (dialog) {
      const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        // Fallback when the dialog has no focusable descendants. Currently
        // unreachable in this form: FormField inputs and FormActions always render
        // focusable elements. Kept defensively so keyboard users still land
        // somewhere safe if the form is ever rendered with all fields disabled.
        //
        // Niche caveat: while focus is on the dialog itself, the Tab handler below
        // short-circuits on `focusables.length === 0`, which would let the browser's
        // native Tab escape the modal. Acceptable here because this branch is
        // unreachable; consider a stricter fallback if that ever changes.
        dialog.setAttribute("tabindex", "-1");
        dialog.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const currentDialog = dialogRef.current;
      if (!currentDialog) return;
      const focusables = Array.from(
        currentDialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusables.length === 0) return;

      // The empty-array guard above proves both ends are defined. The `!`
      // assertions are required because `noUncheckedIndexedAccess` widens
      // index access to `T | undefined`.
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? focusables.indexOf(active) : -1;

      if (e.shiftKey) {
        // Shift+Tab on the first element wraps to the last
        if (currentIndex <= 0) {
          e.preventDefault();
          last.focus();
        }
      } else if (currentIndex === focusables.length - 1) {
        // Tab on the last element wraps to the first
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to whatever element opened the dialog (Add or Edit button).
      // `document.contains` guards against the trigger having been removed from
      // the DOM while the modal was open (e.g., the StudentCard was deleted).
      if (previouslyFocusedElement && document.contains(previouslyFocusedElement)) {
        previouslyFocusedElement.focus();
      }
    };
  }, [onClose]);

  const validate = (data: StudentFormData): typeof errors => {
    const nextErrors: typeof errors = {};
    if (!data.name.trim()) {
      nextErrors.name = "Name is required";
    }
    const ageError = validatePositiveNumber("Age", data.age);
    if (ageError) {
      nextErrors.age = ageError;
    }
    const yearError = validatePositiveNumber("Year", data.year);
    if (yearError) {
      nextErrors.year = yearError;
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-form-title"
      onClick={onClose}
    >
      <div
        className="animate-modal w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            id="student-form-title"
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            {student ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close form"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* exactOptionalPropertyTypes: omit the `error` prop entirely when
              there is no message, instead of passing `error={undefined}`. */}
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
            {...(errors.name && { error: errors.name })}
          />

          <FormField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
            min="1"
            {...(errors.age && { error: errors.age })}
          />

          <FormField
            label="Year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
            required
            min="1"
            {...(errors.year && { error: errors.year })}
          />

          <FormActions isEditing={!!student} onCancel={onClose} />
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
