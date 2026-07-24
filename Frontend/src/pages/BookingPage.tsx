import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";
import Dropdown from "../components/Dropdown";
import { TIME_SLOTS } from "../constants/timeSlots";
import CalendarButton from "../components/CalendarButton";
import { checkIsSlotAvailable } from "../utils/bookingUtils";

function BookingPage () {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<string>("")
    const [selectedService, setSelectedService] = useState<string>("")
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([])

    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data.result))

        fetch("http://localhost:3000/services")
            .then(res => res.json())
            .then(data => setServices(data.result))
    }, [])

    useEffect(() => {
        if (selectedEmployee) {
            fetch(`http://localhost:3000/appointments/employee/${selectedEmployee}`)
                .then(res => res.json())
                .then(data => setAppointments(data))

            fetch("http://localhost:3000/appointments")
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.result)) {
                    setExistingAppointments(data.result)
                }
            })
            .catch(err => console.error("Error fetching appointments:", err))
        }
    }, [selectedEmployee, selectedDate])

    return(
        <div className="Booking-Page">
            <div className="Employee-dropdown">
                <Dropdown
                    label="Select Employee"
                    options={employees.map(e => ({id: e.id, label: e.name}))}
                    onSelect={(id) => setSelectedEmployee(id)}
                />
            </div>
            <div className="Service-dropdown">
                <Dropdown
                    label="Select Service"
                    options={services.map(e => ({id: e.id, label: e.name}))}
                    onSelect={(id) => setSelectedService(id)}
                    />
            </div>
            <div className="date-picker-container">
                <label htmlFor="booking-date">Pick a date:</label>
                <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div>
                <h3>Select a time:</h3>
                <h3>Selected time: {selectedSlot}</h3>
                <div className="time-slot-grid">
                    {TIME_SLOTS.map((slot) => (
                        <CalendarButton
                            key={slot}
                            time={slot}
                            isAvailable={checkIsSlotAvailable({
                                slotTime: slot,
                                selectedEmployee,
                                selectedService,
                                selectedDate,
                                services,
                                existingAppointments
                            })}
                            onClick={(time) => setSelectedSlot(time)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookingPage