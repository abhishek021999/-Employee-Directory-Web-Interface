import React, { useRef, useState } from 'react';
import './FilterPopup.css';

const FilterPopup = ({ onApply, onClose }) => {
  const [formData, setFormData] = useState({ name: '', department: '', role: '' });
  const modalRef = useRef();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(formData);
    onClose();
  };

  const handleReset = () => {
    const resetData = { name: '', department: '', role: '' };
    setFormData(resetData);
    onApply(resetData);
    onClose();
  };

   const handleOverlayClick = (e) => {
    // Close only if click was outside modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
     <div className="modal-overlay" onClick={handleOverlayClick}>
    <div className="filter-popup" ref={modalRef}>
      <h3>Filter Employees</h3>
      <label>
        First Name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Department:
        <input name="department" value={formData.department} onChange={handleChange} />
      </label>
      <label>
        Role:
        <input name="role" value={formData.role} onChange={handleChange} />
      </label>
      <div className="popup-buttons">
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
    </div>
  );
};

export default FilterPopup;
