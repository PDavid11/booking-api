import { Link } from 'react-router-dom'
import AdminCard from '../components/AdminCard'
import type { AppointmentCard } from '../types/types'
import { useState, useEffect } from 'react'
import type { Appointment } from '../types/types'

export default function AppointmentsPage() {

const [Appointments, setAppointments] = useState<AppointmentCard[]>([])
const token = localStorage.getItem('token')
            if (!token) {
                alert('No token found. Please log in again.')
                return
            }

    const fetchAppointments = () => {
        fetch('http://localhost:3000/appointments/status/PENDING', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.result)) {
                    setAppointments(data.result)
                } else {
                    setAppointments([])
                }
            })
            
            .catch((error) => {
                console.error('Error fetching appointments:', error)
                setAppointments([])
            })
        }
    useEffect(() => {
        fetchAppointments()
    }, [])

    const handleStatusChange = async (id: string, slotID: string, newStatus: 'CONFIRMED' | 'CANCELLED' | 'REJECTED') => {
        if (newStatus === 'CANCELLED' || newStatus === 'REJECTED') {
            console.log(slotID)
            await fetch(`http://localhost:3000/availableSlots`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ id: slotID, isBooked: "false" })
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setAppointments((prev) => prev.filter((app) => app.id))
                } else {
                    alert('Status change error!')
                }
            })
            .then(() => {
                fetchAppointments()
            })
            .catch((err) => console.log('PATCH request error:', err))
        }
        await fetch(`http://localhost:3000/appointments`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
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
        .then(() => {
            fetchAppointments()
        })
        .catch((err) => console.error('PATCH request error:', err))
    }

    return (
        <div>
            <h1>Appointments Page</h1>
            {!Appointments || !Array.isArray(Appointments) || Appointments.length === 0 ? (
                <div className='empty-state'>
                    <p>There are currently no pending appointment.</p>
                </div>
            ) : (
                <div>

                    <h2>Pending Appointments</h2>
                    <div>
                        {Appointments.map((app) => (
                            <AdminCard key={app.id} appointment={app}
                            onConfirm={(id) => handleStatusChange(id, app.slotID, 'CONFIRMED')}
                            onCancel={(id) => handleStatusChange(id, app.slotID, 'CANCELLED')} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}