import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";
import Dropdown from "../components/Dropdown";
import CalendarButton from "../components/CalendarButton";
import Button from "../components/Button";
import type { AvailableSlot } from "../types/types";

function BookingPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [, setAppointments] = useState<Appointment[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [, setExistingAppointments] = useState<Appointment[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.result || []));

    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data.result || []));

    fetch("http://localhost:3000/availableSlots")
      .then((res) => res.json())
      .then((data) => setAvailableSlots(data.result || []));
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetch(`http://localhost:3000/appointments/employee/${selectedEmployee}`)
        .then((res) => res.json())
        .then((data) => setAppointments(data));

      fetch("http://localhost:3000/appointments")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.result)) {
            setExistingAppointments(data.result);
          }
        })
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  }, [selectedEmployee, selectedDate]);

  const handleBooking = async () => {
    if (!selectedEmployee || !selectedService || !selectedSlot || !phoneNumber || !customerName) {
      alert("Please select an employee, service, date, time slot, phone number, and customer name before booking.");
      return;
    }

    const newAppointment = {
      employeeID: selectedEmployee,
      serviceID: selectedService,
      startTime: selectedSlot.startTime,
      slotID: selectedSlot.id,
      name: customerName,
      phone: phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });
      await fetch("http://localhost:3000/availableSlots", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedSlot.id, isBooked: "true" }),
      });

      if (response.ok) {
        alert("Appointment booked successfully!(Wait for confirmation.)");
        selectedSlot.isBooked = true;
        setSelectedSlot(null);
        setCustomerName("");
        setPhoneNumber("");
        setSelectedDate("");
        fetch("http://localhost:3000/appointments")
          .then((res) => res.json())
          .then((data) => {
            if (data && Array.isArray(data.result)) {
              setExistingAppointments(data.result);
            }
          })
          .catch((err) => console.error("Error fetching appointments:", err));
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment. Please try again.");
    }
  };

  const openSlots = availableSlots.filter((slot) => !slot.isBooked);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Book an Appointment</h1>
      <p className="mt-3 max-w-[55ch] text-muted">
        Válassz stylistot, szolgáltatást és szabad időpontot. A foglalás után megerősítésre vár.
      </p>

      <div className="mt-8 flex flex-col gap-6 rounded-[12px] border border-line bg-surface p-6 md:p-8">
        <Dropdown
          label="Select Employee"
          options={employees.map((e) => ({ id: e.id, label: e.name }))}
          onSelect={(id) => setSelectedEmployee(id)}
        />
        <Dropdown
          label="Select Service"
          options={services.map((e) => ({ id: e.id, label: e.name }))}
          onSelect={(id) => setSelectedService(id)}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone number
          </label>
          <input
            id="phone"
            className="w-full rounded-[12px] border border-line bg-surface px-3 py-2.5 text-base outline-none focus:border-accent"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Select a time</h2>
          <p className="mt-1 text-sm text-muted">
            Selected time:{" "}
            {selectedSlot
              ? new Date(selectedSlot.startTime).toLocaleString("hu-HU", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "None"}
          </p>

          <div className="mt-4 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto rounded-[12px] bg-canvas p-3 sm:grid-cols-3">
            {openSlots.length === 0 ? (
              <p className="col-span-full p-6 text-center text-sm text-muted">No available slots found.</p>
            ) : (
              openSlots.map((slot) => {
                const formattedTime = new Date(slot.startTime).toLocaleString("hu-HU", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
                const isSlotAvailable = !slot.isBooked;

                return (
                  <CalendarButton
                    key={slot.id}
                    time={formattedTime}
                    isAvailable={isSlotAvailable}
                    isSelected={selectedSlot?.id === slot.id}
                    onClick={() => {
                      if (isSlotAvailable) {
                        setSelectedSlot(slot);
                      }
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="customerName" className="text-sm font-semibold">
            Your name
          </label>
          <input
            id="customerName"
            type="text"
            className="w-full rounded-[12px] border border-line bg-surface px-3 py-2.5 text-base outline-none focus:border-accent"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <Button text="Book Appointment" variant="primary" onClick={() => handleBooking()} />
      </div>
    </div>
  );
}

export default BookingPage;
