import React, { useState, useEffect } from 'react'
import Dropdown from "../components/Dropdown"
import type { Employee, AvailableSlot } from "../types/types"

export const AddSlotPage: React.FC = () => {
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<string>(employees[0]?.id || '')
    const [startDate, setStartDate] = useState<string>('')
    const [startHHMM, setStartHHMM] = useState<string>('')
    const [startTime, setStartTime] = useState('')
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem('token')

    const fetchAvailableSlots = async () => {
        try {
            const response = await fetch('http://localhost:3000/availableSlots')
            const data = await response.json()
            setAvailableSlots(data.result || [])
        } catch (error) {
            setError('Failed to fetch available slots')
            setAvailableSlots([])
        }
    }
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3000/employees')
            const data = await response.json()
            setEmployees(data.result || [])
        } catch (error) {
            setError('Failed to fetch employees')
            setEmployees([])
        }
    }

    useEffect(() => {
        fetchAvailableSlots()
        fetchEmployees()
    }, [])

    const handleAddSlot = async (e: React.SubmitEvent) => {
        
        const startTimeString = `${startDate}T${startHHMM}:00`
        const isoStartTime = new Date(startTimeString).toISOString()

        e.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:3000/availableSlots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ employeeId: selectedEmployee, startTime: isoStartTime, isBooked: false })
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to add available slot')
            }
            setStartTime('')
            fetchAvailableSlots()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleDeleteSlot = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/availableSlots`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to delete available slot')
            }
            fetchAvailableSlots()
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Available Slots Management</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <form onSubmit={handleAddSlot}>
                    <div>
                        <Dropdown
                            label="Employee"
                            options={employees.map(e => ({ id: e.id, label: e.name }))}
                            onSelect={(id: string) => setSelectedEmployee(id)}
                        />
                        <p>Start Date:</p>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <p>Start Time hour:</p>
                        <input
                            type="time"
                            value={startHHMM}
                            onChange={(e) => setStartHHMM(e.target.value)}
                        />

                        <button type="submit">Add Slot</button>
                    </div>
                </form>

                <h1>Available Slots List</h1>
                {availableSlots.length < 1 ? (
                    <p>No available slots found.</p>
                ) : (
                    <ul>
                        {availableSlots.map((s) => (
                            <li key={s.id}>
                                Start Time: {new Date(s.startTime).toLocaleString('hu-HU', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })},
                                Is Booked: {s.isBooked ? 'Yes' : 'No'}
                                <button onClick={() => handleDeleteSlot(s.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    )
                }
            </div>
        </div>
    )
}