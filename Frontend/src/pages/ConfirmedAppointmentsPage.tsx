import React, { useState, useEffect } from 'react'

interface Appointment {
    id: string
    guestName: string
    phone: string
    serviceName: string
    employeeName: string
    startTime: string
    status: 'confirmed'
}

export const ConfirmedAppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem('token')

    const formatTime = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleString('hu-HU', { hour: '2-digit', minute: '2-digit'})
    }

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString)
        return date.toLocaleDateString('hu-HU')
    }

    const fetchConfirmedAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3000/appointments/status/CONFIRMED', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch confirmed appointments')
            }
            console.log('Fetched confirmed appointments:', data.result)

            const sortedData = data.result.sort((a: Appointment, b: Appointment) => {
                return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            })
            setAppointments(sortedData)
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchConfirmedAppointments()
    }, [])

    return (
        <div>
            <h1>Confirmed Appointments</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {appointments.length === 0 ? (
                <p>No confirmed appointments available.</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <p><strong>Customer Name:</strong> {appointment.guestName}</p>
                            <p><strong>Customer Phone:</strong> {appointment.phone}</p>
                            <p><strong>Service Name:</strong> {appointment.serviceName}</p>
                            <p><strong>Employee Name:</strong> {appointment.employeeName}</p>
                            <p><strong>Date:</strong> {formatDate(appointment.startTime)}</p>
                            <p><strong>Start Time:</strong> {formatTime(appointment.startTime)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}