import React, { useState } from "react";
import "./AddEmployeeForm.css";

const AddEmployeeForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on input
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const employee = {
      id: Date.now(),
      name: fullName,
      email: formData.email,
      department: formData.department,
      role: formData.role,
    };
    onAdd(employee);
    onClose();
  };

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
    <div className="modal">
      <h2>Add Employee</h2>

      <div className="form-group">
        <label>First name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      <div className="row-group">
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
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
          {errors.department && <p className="error">{errors.department}</p>}
        </div>
      </div>

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
  );
};

export default AddEmployeeForm;
