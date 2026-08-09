import React, { useState, useEffect } from 'react'

interface Employee {
    id: string
    name: string
    phone: string
    instagram: string
    role: string
}

export const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [instagram, setInstagram] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem('token')

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3000/employees')
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch employees')
            }
            setEmployees(data.result)
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleAddEmployee = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setError(null)
        

        try {
            const response = await fetch('http://localhost:3000/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, role, instagram, phone})
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to add employee')
            }
            setName('')
            setRole('')
            setInstagram('')
            setPhone('')
            fetchEmployees()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleDeleteEmployee = async (ID: string) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return
        }
        try {
            const response = await fetch(`http://localhost:3000/employees`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ID })
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to delete employee')
            }
            fetchEmployees()
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Employee Management</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <form onSubmit={handleAddEmployee}>
                    <div>
                        <p>Name: </p>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <p>Phone: </p>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                    />
                        <p>Instagram: </p> 
                        <input
                            type="text"
                            placeholder="Instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            required
                        />
                        <p>Role: </p>
                        <input
                            type="text"
                            placeholder="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Employee</button>
                </form>
                
            </div>
            <h1>Employee List</h1>
            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <ul>
                     {employees.map((employee) => (
                        <li key={employee.id}>
                            <strong>{employee.name}</strong> - {employee.role} - {employee.phone} - {employee.instagram}
                            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )
        }</div>
    )
}

