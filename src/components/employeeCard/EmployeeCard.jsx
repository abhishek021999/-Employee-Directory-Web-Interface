import React from 'react';

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h3>{employee.name}</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <div className="card-buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(employee.id)}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
