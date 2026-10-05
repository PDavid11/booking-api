import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import type { Employee, AvailableSlot } from "../types/types";

export const AddSlotPage: React.FC = () => {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>(employees[0]?.id || "");
  const [startDate, setStartDate] = useState<string>("");
  const [startHHMM, setStartHHMM] = useState<string>("");
  const [, setStartTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch("http://localhost:3000/availableSlots");
      const data = await response.json();
      setAvailableSlots(data.result || []);
    } catch (error) {
      setError("Failed to fetch available slots");
      setAvailableSlots([]);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data.result || []);
    } catch (error) {
      setError("Failed to fetch employees");
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
    fetchEmployees();
  }, []);

  const handleAddSlot = async (e: React.SubmitEvent) => {
    const startTimeString = `${startDate}T${startHHMM}:00`;
    const isoStartTime = new Date(startTimeString).toISOString();

    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/availableSlots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ employeeId: selectedEmployee, startTime: isoStartTime, isBooked: false }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add available slot");
      }
      setStartTime("");
      fetchAvailableSlots();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/availableSlots`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete available slot");
      }
      fetchAvailableSlots();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Available Slots Management</h1>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <div>
        <form onSubmit={handleAddSlot} className="mt-6 max-w-lg rounded-[12px] border border-line bg-surface p-6">
          <div className="flex flex-col gap-4">
            <Dropdown
              label="Employee"
              options={employees.map((e) => ({ id: e.id, label: e.name }))}
              onSelect={(id: string) => setSelectedEmployee(id)}
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Start Date:</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Start Time hour:</p>
              <input
                type="time"
                value={startHHMM}
                onChange={(e) => setStartHHMM(e.target.value)}
                className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="rounded-[12px] bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Add Slot
            </button>
          </div>
        </form>

        <h1 className="mt-10 text-xl font-semibold">Available Slots List</h1>
        {availableSlots.length < 1 ? (
          <p className="mt-4 text-muted">No available slots found.</p>
        ) : (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {availableSlots.map((s) => (
              <li key={s.id} className="rounded-[12px] border border-line bg-surface p-4">
                Start Time:{" "}
                {new Date(s.startTime).toLocaleString("hu-HU", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
                , Is Booked: {s.isBooked ? "Yes" : "No"}
                <button
                  onClick={() => handleDeleteSlot(s.id)}
                  className="mt-3 block rounded-[12px] bg-ink px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
