import React from "react";
import { Student } from "@/types/Student";
import StudentCard from "./StudentCard";
import EmptyState from "./EmptyState";

interface StudentGridProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  if (students.length === 0) {
    return (
      <main>
        <EmptyState />
      </main>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <StudentCard
            key={student.id}
            student={student}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </main>
  );
};

export default StudentGrid;
