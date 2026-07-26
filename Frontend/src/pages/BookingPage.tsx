import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";
import Dropdown from "../components/Dropdown";
import { TIME_SLOTS } from "../constants/timeSlots";
import CalendarButton from "../components/CalendarButton";
import Button from "../components/Button";
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
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [customerName, setCustomerName] = useState<string>("")

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

    const handleBooking = async () => {
        if (!selectedEmployee || !selectedService || !selectedSlot || !selectedDate || !phoneNumber || !gender || !customerName) {
            alert("Please select an employee, service, date, time slot, phone number, gender, and customer name before booking.");
            return;
        }

        const startTime = `${selectedDate}T${selectedSlot}:00`

        const newAppointment = {
            gender: gender,
            employeeID: selectedEmployee,
            serviceID: selectedService,
            startTime: startTime,
            name: customerName,
            phone: phoneNumber
        }

        try {
            const response = await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAppointment)
            })

            if (response.ok) {
                alert("Appointment booked successfully!(Wait for confirmation.)")
                setSelectedSlot(null)
                fetch("http://localhost:3000/appointments")
                    .then(res => res.json())
                    .then(data => {
                        if (data && Array.isArray(data.result)) {
                            setExistingAppointments(data.result)
                        }
                    })
                    .catch(err => console.error("Error fetching appointments:", err))
            } else {
                alert("Failed to book appointment. Please try again.")
            }
        } catch (error) {
            console.error("Error booking appointment:", error)
            alert("An error occurred while booking the appointment. Please try again.")
        }
    }

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
            <div className="Gender-select">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">-- Choose --</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
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
                <input 
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                <div className="Costumer-name">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        text="Book Appointment"
                        color="blue"
                        onClick={() => {handleBooking()}}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingPage