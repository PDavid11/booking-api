import { Link } from 'react-router-dom'
import AdminCard from '../components/AdminCard'
import type { AppointmentCard } from '../types/types'
import { useState, useEffect } from 'react'
import type { Appointment } from '../types/types'

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
            .catch(() => setAppointments([]))
        }, [Appointments])

        const handleStatusChange = (id: string, newStatus: 'CONFIRMED' | 'CANCELLED' | 'REJECTED') => {
            fetch(`http://localhost:3000/appointments`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ id: id, status: newStatus})
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setAppointments((prev) => prev.filter((app) => app.id))
                } else {
                    alert('Status change error!')
                }
            })
            .catch((err) => console.error('PATCH request error:', err))
        }

    return (
        <div>
            <h1>Admin Page</h1>
            <Link to="/">
                Back to Landing Page
            </Link>

            {Appointments.length === 0 ? (
                <div className='empty-state'>
                    <p>There are currently no pending appointment.</p>
                </div>
            ) : (
                <div>

                    <h2>Pending Appointments</h2>
                    <div>
                        {Appointments.map((app) => (
                            <AdminCard key={app.id} appointment={app}
                            onConfirm={(id) => handleStatusChange(id, 'CONFIRMED')}
                            onCancel={(id) => handleStatusChange(id, 'CANCELLED')} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}