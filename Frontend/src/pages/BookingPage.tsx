import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";
import Dropdown from "../components/Dropdown";
import CalendarButton from "../components/CalendarButton";
import Button from "../components/Button";
import type { AvailableSlot } from "../types/types";
import { Link } from "react-router-dom";

function BookingPage () {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<string>("")
    const [selectedService, setSelectedService] = useState<string>("")
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([])
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [customerName, setCustomerName] = useState<string>("")
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])

    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data.result || []))

        fetch("http://localhost:3000/services")
            .then(res => res.json())
            .then(data => setServices(data.result || []))

        fetch("http://localhost:3000/availableSlots")
            .then(res => res.json())
            .then(data => setAvailableSlots(data.result || []))
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
        if (!selectedEmployee || !selectedService || !selectedSlot || !phoneNumber || !customerName) {
            alert("Please select an employee, service, date, time slot, phone number, and customer name before booking.");
            return;
        }

        const newAppointment = {
            employeeID: selectedEmployee,
            serviceID: selectedService,
            startTime: selectedSlot.startTime,
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
            await fetch("http://localhost:3000/availableSlots", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedSlot.id, isBooked: "true" })
            })


            if (response.ok) {
                alert("Appointment booked successfully!(Wait for confirmation.)")
                selectedSlot.isBooked = true
                setSelectedSlot(null)
                setCustomerName("")
                setPhoneNumber("")
                setSelectedDate("")
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
            <h1>Book an Appointment</h1>
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
                <h3>Selected time: {selectedSlot ? new Date(selectedSlot.startTime).toLocaleString('hu-HU', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }) : "None"}
                </h3>

                <div className="time-slot-grid">
                    {availableSlots.length === 0 ? (
                        <p>No available slots found.</p>
                    ) : (
                        availableSlots
                            .filter((slot) => !slot.isBooked)
                            .map((slot) => {
                                const formattedTime = new Date(slot.startTime).toLocaleString('hu-HU', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })
                                const isSlotAvailable = !slot.isBooked

                                return (
                                    <CalendarButton
                                        key={slot.id}
                                        time={formattedTime}
                                        isAvailable={isSlotAvailable}
                                        isSelected={selectedSlot?.id === slot.id}
                                        onClick={() => {
                                            if (isSlotAvailable) {
                                         setSelectedSlot(slot)
                                            }
                                        }}
                                    />
                                )
                            })
                    )}
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