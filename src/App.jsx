import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeCard from "./components/employeeCard/EmployeeCard";
import AddEmployeeForm from "./components/addEmployeeForm/AddEmployeeForm";
import EditEmployeeForm from "./components/editEmployeeForm/EditEmployeeForm";
import FilterPopup from "./components/FilterPopup/FilterPopup";

// This is some default data to show initially
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
];

function App() {
  // here we are setting up employees list using localStorage or initial data
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : initialEmployees;
  });

  // to search employees
  const [search, setSearch] = useState("");
  // debounced value of search input
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // to keep track of employee we are editing
  const [editEmp, setEditEmp] = useState(null);
  // to show/hide the add form
  const [showForm, setShowForm] = useState(false);
  // how many employees to show
  const [showLimit, setShowLimit] = useState(10);
  // to show/hide filter popup
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  // for filter values
  const [filter, setFilter] = useState({ name: "", department: "", role: "" });
  // to sort by name or department
  const [sortBy, setSortBy] = useState("");

  // filter logic - this filters employees based on search and filters
  let filtered = employees.filter(
    (emp) =>
      (emp.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        emp.email.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
      emp.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      emp.department.toLowerCase().includes(filter.department.toLowerCase()) &&
      emp.role.toLowerCase().includes(filter.role.toLowerCase())
  );

  // sort employees by name or department if selected
  if (sortBy) {
    filtered.sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    });
  }

  // function to add a new employee
  const handleAdd = (newEmp) => {
    setEmployees([...employees, { ...newEmp, id: Date.now() }]);
    setShowForm(false); // hide the form after adding
  };

  // function to update employee details
  const handleUpdate = (updatedEmp) => {
    setEmployees(
      employees.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
    setEditEmp(null); // hide edit form
  };

  // function to delete employee
  const deleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${emp?.name}?`
    );
    if (confirmDelete) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // whenever employees data changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Employee Directory</h1>

          <div className="search-filter">
            {/* input for searching */}
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* button to open filter popup */}
          <button onClick={() => setShowFilterPopup(true)}>Filter</button>
        </header>

        {/* show filter popup if true */}
        {showFilterPopup && (
          <FilterPopup
            onApply={(data) => setFilter(data)}
            onClose={() => setShowFilterPopup(false)}
          />
        )}

        <div className="controls">
          <div className="sortings">
            {/* sorting dropdown */}
            <label>
              Sort:
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">--Select--</option>
                <option value="name">Name</option>
                <option value="department">Department</option>
              </select>
            </label>

            {/* how many to show */}
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

          {/* button to show add form */}
          <button className="add-btn" onClick={() => setShowForm(true)}>
            Add Employee
          </button>
        </div>

        {/* display employee cards */}
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

        {/* show add employee form */}
        {showForm && (
          <AddEmployeeForm
            onAdd={handleAdd}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* show edit employee form */}
        {editEmp && (
          <EditEmployeeForm
            employee={editEmp}
            onUpdate={handleUpdate}
            onClose={() => setEditEmp(null)}
          />
        )}
      </div>

      {/* footer section */}
      <footer>© 2025 Employee Directory App. All rights reserved.</footer>
    </>
  );
}

export default App;
