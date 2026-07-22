import { useAppState } from "@/hooks/useAppState";
import Background from "@/components/layout/Background";
import Filtering from "@/components/Filtering";
import Header from "@/components/layout/Header";
import StudentForm from "@/components/form/StudentForm";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

function App() {
  const {
    students,
    showForm,
    editingStudent,
    darkMode,
    pendingDeleteId,
    modalOpen,
    pendingDeleteName,
    toggleDarkMode,
    handleEdit,
    handleCloseForm,
    handleSave,
    requestDeleteStudent,
    confirmDeleteStudent,
    cancelDelete,
    handleAddNew,
  } = useAppState();

  return (
    <div className="min-h-screen py-8 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <Background />

      {/* While ANY modal is open, pull the main page out of the focus
          order so Tab cannot leak behind the dialog. `inert` covers
          focus + a11y tree in modern browsers; `aria-hidden` is the
          fallback for older engines. */}
      <div
        className="relative container mx-auto px-4 z-10"
        inert={modalOpen || undefined}
        aria-hidden={modalOpen || undefined}
      >
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        <Filtering
          students={students}
          onEdit={handleEdit}
          onDelete={requestDeleteStudent}
          onAddNew={handleAddNew}
        />
      </div>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}

      {pendingDeleteId && (
        <ConfirmDialog
          title="Delete student"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {pendingDeleteName ?? "this student"}
              </span>
              ? This action cannot be undone.
            </>
          }
          confirmLabel="Delete"
          variant="danger"
          onConfirm={confirmDeleteStudent}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default App;
