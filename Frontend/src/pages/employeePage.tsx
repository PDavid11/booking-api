import React, { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  phone: string;
  instagram: string;
  role: string;
}

export const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch employees");
      }
      setEmployees(data.result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, role, instagram, phone }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add employee");
      }
      setName("");
      setRole("");
      setInstagram("");
      setPhone("");
      fetchEmployees();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteEmployee = async (ID: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/employees`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ID }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete employee");
      }
      fetchEmployees();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Employee Management</h1>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}
      <div>
        <form onSubmit={handleAddEmployee} className="mt-6 max-w-lg rounded-[12px] border border-line bg-surface p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Name: </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Phone: </p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Instagram: </p>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Role: </p>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-[12px] bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Add Employee
          </button>
        </form>
      </div>
      <h1 className="mt-10 text-xl font-semibold">Employee List</h1>
      {employees.length === 0 ? (
        <p className="mt-4 text-muted">No employees found.</p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {employees.map((employee) => (
            <li key={employee.id} className="rounded-[12px] border border-line bg-surface p-4">
              <strong>{employee.name}</strong> - {employee.role} - {employee.phone} - {employee.instagram}
              <button
                onClick={() => handleDeleteEmployee(employee.id)}
                className="mt-3 block rounded-[12px] bg-ink px-3 py-1.5 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
