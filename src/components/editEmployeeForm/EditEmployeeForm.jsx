import React, { useState } from 'react';

const EditEmployeeForm = ({ employee, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };
  const handleCancel = () => {
  const confirmDiscard = window.confirm("You have unsaved changes. Are you sure you want to discard them?");
  if (confirmDiscard) {
    onClose();
  }
};


  return (
    <div className="modal">
      <h3>Edit Employee</h3>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="department" value={formData.department} onChange={handleChange} />
      <input name="role" value={formData.role} onChange={handleChange} />
      <div className="card-buttons">
        <button onClick={handleSubmit}>Update</button>
        <button  onClick={handleCancel}>Cancel</button>

      </div>
    </div>
  );
};

export default EditEmployeeForm;
