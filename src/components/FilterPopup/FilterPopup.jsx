import React, { useRef, useState } from "react";
import "./FilterPopup.css";

// This component is used to filter employees based on name, department, and role
const FilterPopup = ({ onApply, onClose }) => {
  // initial state to store filter values
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
  });

  // ref to refer the modal
  const modalRef = useRef();

  // when input value changes, update the form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // apply filter and close popup
  const handleApply = () => {
    onApply(formData); // send filter data to parent
    onClose(); // close the popup
  };

  // reset all fields to default and close popup
  const handleReset = () => {
    const resetData = { name: "", department: "", role: "" };
    setFormData(resetData); // clear all inputs
    onApply(resetData); // send empty filter
    onClose(); // close the popup
  };

  // close the popup if clicked outside the modal box
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // overlay area to detect outside clicks
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="filter-popup" ref={modalRef}>
        <h3>Filter Employees</h3>

        <label>
          First Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Department:
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
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
