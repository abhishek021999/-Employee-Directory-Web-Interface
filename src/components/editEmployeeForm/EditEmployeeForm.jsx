import React, { useRef, useState } from "react";

const EditEmployeeForm = ({ employee, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...employee });
  const modalRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };
  const handleCancel = () => {
    const confirmDiscard = window.confirm(
      "You have unsaved changes. Are you sure you want to discard them?"
    );
    if (confirmDiscard) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    // Close only if click was outside modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
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
