import { useState, useEffect } from "react";
import type { Employee, Service, Appointment } from "../types/types";

export function BookingPage () {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [selecterEmployee, setSelectedEmployee] = useState<string>("")
    const [selecterService, setSelectedService] = useState<string>("")
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selecterTime, setSelectedTime] = useState<string>("")

    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data))

        fetch("http://localhost:3000/services")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/employees")
    })
}