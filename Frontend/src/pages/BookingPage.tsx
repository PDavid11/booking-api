import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";
import Dropdown from "../components/Dropdown";

function BookingPage () {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<string>("")
    const [selectedService, setSelectedService] = useState<string>("")
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedTime, setSelectedTime] = useState<string>("")

    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data))

        fetch("http://localhost:3000/services")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    useEffect(() => {
        if (selectedEmployee) {
            fetch(`http://localhost:3000/appointments/employee/${selectedEmployee}`)
                .then(res => res.json())
                .then(data => setAppointments(data))
        }
    }, [selectedEmployee])

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
                    options={employees.map(e => ({id: e.id, label: e.name}))}
                    onSelect={(id) => setSelectedService(id)}
                    />
            </div>
        </div>
    )
}

export default BookingPage