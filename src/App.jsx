import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeCard from "./components/employeeCard/EmployeeCard";
import AddEmployeeForm from "./components/addEmployeeForm/AddEmployeeForm";
import EditEmployeeForm from "./components/editEmployeeForm/EditEmployeeForm";
import FilterPopup from "./components/FilterPopup/FilterPopup";
const initialEmployees = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "IT",
    role: "Developer",
  },
  {
    id: 3,
    name: "Charlie Lee",
    email: "charlie@example.com",
    department: "Finance",
    role: "Analyst",
  },
  // Add more if needed
];

function App() {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : initialEmployees;
  });

  const [search, setSearch] = useState("");
  const [editEmp, setEditEmp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLimit, setShowLimit] = useState(10);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filter, setFilter] = useState({ name: "", department: "", role: "" });
  const [sortBy, setSortBy] = useState("");

  let filtered = employees.filter(
    (emp) =>
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())) &&
      emp.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      emp.department.toLowerCase().includes(filter.department.toLowerCase()) &&
      emp.role.toLowerCase().includes(filter.role.toLowerCase())
  );

  // Sort based on selected value
  if (sortBy) {
    filtered.sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    });
  }

  const handleAdd = (newEmp) => {
    setEmployees([...employees, { ...newEmp, id: Date.now() }]);
    setShowForm(false);
  };

  const handleUpdate = (updatedEmp) => {
    setEmployees(
      employees.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
    setEditEmp(null);
  };

  const deleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${emp?.name}?`
    );
    if (confirmDelete) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Employee Directory</h1>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setShowFilterPopup(true)}>Filter</button>
        </header>
        {showFilterPopup && (
          <FilterPopup
            onApply={(data) => setFilter(data)}
            onClose={() => setShowFilterPopup(false)}
          />
        )}

        <div className="controls">
          <div className="sortings">
            <label htmlFor="">
              Sort:
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">--Select--</option>
                <option value="name">Name</option>
                <option value="department">Department</option>
                {/* <option value="role">Role</option> */}
              </select>
            </label>

            <label>
              Show:
              <select
                value={showLimit}
                onChange={(e) => {
                  setShowLimit(Number(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            Add Employee
          </button>
        </div>

        <div className="employee-list">
          {filtered.slice(0, showLimit).map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onDelete={deleteEmployee}
              onEdit={() => setEditEmp(emp)}
            />
          ))}
        </div>

        {showForm && (
          <AddEmployeeForm
            onAdd={handleAdd}
            onClose={() => setShowForm(false)}
          />
        )}
        {editEmp && (
          <EditEmployeeForm
            employee={editEmp}
            onUpdate={handleUpdate}
            onClose={() => setEditEmp(null)}
          />
        )}
      </div>
      <footer>© 2025 Employee Directory App. All rights reserved.</footer>
    </>
  );
}

export default App;
