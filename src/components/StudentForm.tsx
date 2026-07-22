import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Student, StudentFormData } from "../types/Student";
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
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = (data: StudentFormData): typeof errors => {
    const nextErrors: typeof errors = {};
    if (!data.name.trim()) {
      nextErrors.name = "Name is required";
    }
    if (!data.age.trim()) {
      nextErrors.age = "Age is required";
    } else if (Number(data.age) <= 0) {
      nextErrors.age = "Age must be greater than 0";
    }
    if (!data.year.trim()) {
      nextErrors.year = "Year is required";
    } else if (Number(data.year) <= 0) {
      nextErrors.year = "Year must be greater than 0";
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
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
            autoFocus
            error={errors.name}
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
            error={errors.age}
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
            error={errors.year}
          />

          <FormActions isEditing={!!student} onCancel={onClose} />
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
