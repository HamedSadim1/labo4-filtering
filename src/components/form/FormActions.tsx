import React from "react";
import ActionButton from "@/components/buttons/ActionButton";
import CancelButton from "@/components/buttons/CancelButton";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex gap-4 pt-2">
      <ActionButton type="submit" variant="primary">
        {isEditing ? "Update Student" : "Add Student"}
      </ActionButton>
      <CancelButton onClick={onCancel}>Cancel</CancelButton>
    </div>
  );
};

export default FormActions;
