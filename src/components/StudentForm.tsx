import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Student, StudentFormData } from "../types/Student";
import { isValidStudentData } from "../utils/studentUtils";
import FormField from "./FormField";
import FormActions from "./FormActions";

interface StudentFormProps {
  student: Student | null;
  onSave: (formData: StudentFormData) => void;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    age: "",
    year: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        age: student.age.toString(),
        year: student.year.toString(),
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isValidStudentData(formData)) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-2xl bg-black/30 dark:bg-black/40 rounded-3xl p-8 w-full max-w-md shadow-3xl border border-white/10 dark:border-white/5 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {student ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={onClose}
            className="backdrop-blur-sm bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-white p-2 rounded-xl transition-all duration-300 border border-white/30 dark:border-white/10"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
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
          />

          <FormActions isEditing={!!student} onCancel={onClose} />
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
