import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Student, StudentFormData } from "@/types/Student";
import { useGlobalKeydown } from "@/hooks/useGlobalKeydown";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useRestoreFocus } from "@/hooks/useRestoreFocus";
import Modal from "@/components/layout/Modal";
import { STUDENT_FIELD_CONFIG } from "@/constants/students";
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

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentFormData, string>>
  >({});
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

  // Modal accessibility composed from three reusable hooks. Each owns
  // one concern so the StudentForm component body stays focused on
  // form state rather than focus management.
  useFocusTrap(dialogRef);
  useRestoreFocus();
  // Escape closes the modal even when focus is in the form fields.
  useGlobalKeydown("Escape", () => onClose(), { skipWhenEditable: false });

  const validate = (data: StudentFormData): typeof errors => {
    const nextErrors: typeof errors = {};
    for (const field of STUDENT_FIELD_CONFIG) {
      const message = field.validate(data[field.name]);
      if (message) {
        nextErrors[field.name] = message;
      }
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
    <Modal contentRef={dialogRef} onClose={onClose} ariaLabelledBy="student-form-title">
      <div className="flex justify-between items-center mb-6">
        <h2
          id="student-form-title"
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          {student ? "Edit Student" : "Add Student"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus-ring"
        >
          <FaTimes aria-hidden focusable={false} size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Render every form field from STUDENT_FIELD_CONFIG so adding
            a new field (e.g. GPA) is a constants-only edit. The
            conditional `{...(err && { error: err })}` keeps
            `exactOptionalPropertyTypes` happy by omitting the prop
            entirely instead of passing `error={undefined}`. */}
        {STUDENT_FIELD_CONFIG.map((field) => {
          const err = errors[field.name];
          return (
            <FormField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              {...(field.min !== undefined && { min: field.min })}
              {...(err && { error: err })}
            />
          );
        })}

        <FormActions isEditing={!!student} onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default StudentForm;
