import React, { useState, useEffect } from "react";

interface Appointment {
  id: string;
  guestName: string;
  phone: string;
  serviceName: string;
  employeeName: string;
  startTime: string;
  status: "confirmed";
}

export const ConfirmedAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString("hu-HU", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString("hu-HU");
  };

  const fetchConfirmedAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/appointments/status/CONFIRMED", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch confirmed appointments");
      }
      console.log("Fetched confirmed appointments:", data.result);

      const sortedData = data.result.sort((a: Appointment, b: Appointment) => {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      });
      setAppointments(sortedData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAppointment = async (ID: string) => {
    try {
      const response = await fetch("http://localhost:3000/appointments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: ID }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      fetchConfirmedAppointments();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchConfirmedAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Confirmed Appointments</h1>
      {error && <p className="mt-4 text-sm text-accent">{error}</p>}
      {appointments.length === 0 ? (
        <p className="mt-8 rounded-[12px] border border-line bg-surface p-10 text-center text-muted">
          No confirmed appointments available.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="rounded-[12px] border border-line bg-surface p-5">
              <p>
                <strong>Customer Name:</strong> {appointment.guestName}
              </p>
              <p>
                <strong>Customer Phone:</strong> {appointment.phone}
              </p>
              <p>
                <strong>Service Name:</strong> {appointment.serviceName}
              </p>
              <p>
                <strong>Employee Name:</strong> {appointment.employeeName}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(appointment.startTime)}
              </p>
              <p>
                <strong>Start Time:</strong> {formatTime(appointment.startTime)}
              </p>
              <button
                onClick={() => handleDeleteAppointment(appointment.id)}
                className="mt-4 rounded-[12px] bg-ink px-4 py-2 text-sm font-semibold text-white"
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
