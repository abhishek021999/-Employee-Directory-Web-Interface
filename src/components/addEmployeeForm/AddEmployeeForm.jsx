import React, { useRef, useState } from "react";
import "./AddEmployeeForm.css";

// This component is used to show the form for adding a new employee
const AddEmployeeForm = ({ onAdd, onClose }) => {
  const modalRef = useRef(); // to refer the modal box
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });

  // This function will close the form if clicked outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [errors, setErrors] = useState({}); // store validation error messages

  // this will update input fields as we type
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error when input changes
  };

  // this function checks if the input fields are filled correctly
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.department)
      newErrors.department = "Department is required";

    if (!formData.role)
      newErrors.role = "Role is required";

    setErrors(newErrors);

    // return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // this function will be called when we click "Add" button
  const handleSubmit = () => {
    if (!validate()) return; // stop if form is not valid

    // combining first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // making an employee object
    const employee = {
      id: Date.now(), // unique id based on current time
      name: fullName,
      email: formData.email,
      department: formData.department,
      role: formData.role,
    };

    onAdd(employee); // send new employee to parent component
    onClose(); // close the form after adding
  };

  // this checks if form is completely and correctly filled before enabling Add button
  const isFormValid = () => {
    const { firstName, lastName, email, department, role } = formData;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      isEmailValid &&
      department &&
      role
    );
  };

  return (
    // when clicking outside the modal box, close the popup
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef}>
        <h2>Add Employee</h2>

        {/* First Name input */}
        <div className="form-group">
          <label>First name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        {/* Last Name input */}
        <div className="form-group">
          <label>Last name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        {/* Email and Department are in same row */}
        <div className="row-group">
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="selectOne"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && (
              <p className="error">{errors.department}</p>
            )}
          </div>
        </div>

        {/* Role dropdown */}
        <div className="form-group">
          <label>Role</label>
          <select
            className="selectOne"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Analyst">Analyst</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="add"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
