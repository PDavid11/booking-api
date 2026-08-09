import React, {useState, useEffect} from 'react'

interface Service {
    id: string
    name: string
    durationMinutes: number
    price: number
}

export const ServicePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([])
    const [name, setName] = useState('')
    const [durationMinutes, setDurationMinutes] = useState(0)
    const [price, setPrice] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem('token')

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/services')
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch services')
            }
            setServices(data.result)
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    const handleAddService = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:3000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, durationMinutes, price })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to add service')
            }
            setName('')
            setDurationMinutes(0)
            setPrice(0)
            fetchServices()
        } catch (err: any) {
            setError(err.message)
        }
    }
    const handleDeleteService = async (id: string) => {
        if (!window .confirm('Are you sure you want to delete this service?')) 
            return

        try {
            const response = await fetch(`http://localhost:3000/services`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to delete service')
            }
            fetchServices()
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Services Management</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleAddService}>
                <div>
                    <p>Service Name:</p>
                    <input
                        type="text"
                        placeholder='Service name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Price:</p>
                    <input
                        type="number"
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        required
                    />
                </div>
                <div>
                    <p>Duration (minutes):</p>
                    <input
                        type="number"
                        placeholder='Duration (minutes)'
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(parseFloat(e.target.value) || 0)}
                        required
                    />
                </div>
                <button type="submit">Add Service</button>
            </form>

            <h2>Existing Services</h2>
            {services.length === 0 ? (
                <p>No services available.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <strong>{service.name}</strong> - Duration: {service.durationMinutes} min, Price: {service.price.toFixed(2)} Ft
                            <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
