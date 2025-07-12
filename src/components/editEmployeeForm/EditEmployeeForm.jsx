import React, { useRef, useState } from "react";

// This component is used to edit an existing employee
const EditEmployeeForm = ({ employee, onUpdate, onClose }) => {
  // create local state with the current employee data
  const [formData, setFormData] = useState({ ...employee });

  // ref to refer the modal box
  const modalRef = useRef();

  // when input field changes, update the state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // this function will be called when we click on Update button
  const handleSubmit = () => {
    onUpdate(formData); // send updated data to parent
  };

  // if user clicks on cancel, confirm before closing
  const handleCancel = () => {
    const confirmDiscard = window.confirm(
      "You have unsaved changes. Are you sure you want to discard them?"
    );
    if (confirmDiscard) {
      onClose(); // close the modal if confirmed
    }
  };

  // if we click outside the modal content, close the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // modal overlay to detect outside click
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef}>
        <h3>Edit Employee</h3>

        <input name="name" value={formData.name} onChange={handleChange} />

        <input name="email" value={formData.email} onChange={handleChange} />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <input name="role" value={formData.role} onChange={handleChange} />

        <div className="card-buttons">
          <button onClick={handleSubmit}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
