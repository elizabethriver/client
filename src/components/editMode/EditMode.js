import { useState } from "react";

export const EditMode = () => {
  const [editState, setEditState] = useState(false);
  const editMode = () => {
    setEditState(!editState);
  };
  const removeEditMode = () => {
    setEditState(false);
  };
  return {
    editState,
    editMode,
    removeEditMode,
  };
};
