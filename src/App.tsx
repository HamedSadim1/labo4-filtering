import { useCallback, useEffect, useState } from "react";
import AddStudentButton from "./components/AddStudentButton";
import Background from "./components/Background";
import Filtering from "./components/Filtering";
import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import Students from "./Student";
import { StudentFormData, Student as StudentType } from "./types/Student";
import { createStudent } from "./utils/studentUtils";

function App() {
  const [students, setStudents] = useState<StudentType[]>(Students);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addStudent = (formData: StudentFormData): void => {
    const newStudent = createStudent(formData);
    setStudents([...students, newStudent]);
  };

  const updateStudent = (formData: StudentFormData): void => {
    if (editingStudent) {
      const updatedStudent = createStudent(formData, editingStudent);
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? updatedStudent : s))
      );
    }
  };

  const deleteStudent = (id: string): void => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleEdit = (student: StudentType): void => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCloseForm = useCallback((): void => {
    setShowForm(false);
    setEditingStudent(null);
  }, []);

  const handleSave = (formData: StudentFormData): void => {
    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
    handleCloseForm();
  };

  return (
    <div className="min-h-screen py-8 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <Background />

      <div className="relative container mx-auto px-4 z-10">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <AddStudentButton onClick={() => setShowForm(true)} />

        <Filtering
          students={students}
          onEdit={handleEdit}
          onDelete={deleteStudent}
        />

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSave={handleSave}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
