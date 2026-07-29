import { Link } from 'react-router-dom'
import AdminCard from '../components/adminCard'
import type { AppointmentCard } from '../types/types'
import { useState, useEffect } from 'react'

export default function AdminPage() {

const [Appointments, setAppointments] = useState<AppointmentCard[]>([])

useEffect(() => {
    fetch('http://localhost:3000/appointments/status/PENDING')
        .then((res) => res.json())
        .then((data) => {
            setAppointments(data.result)
        })
        
        .catch((error) => {
            console.error('Error fetching appointments:', error)
        })
    }, [])

    return (
        <div>
            <h1>Admin Page</h1>
            <Link to="/">
                Back to Landing Page
            </Link>

            <h2>Pending Appointments</h2>
            <div>
                {Appointments.map((app) => (
                    <AdminCard key={app.id} appointment={app} />
                ))}
            </div>
        </div>
    )
}