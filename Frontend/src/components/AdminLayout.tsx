import React from "react"
import {useNavigate, Link, Outlet} from "react-router-dom"

export const AdminLayout: React.FC = () => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        
        <div className="admin-layout">
            <Link to="/">
                Landing Page
            </Link>
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <nav>
                    <Link to="/admin/appointments">Pending Appointments</Link>
                    <Link to="/admin/addslot">Add Slot</Link>
                    <Link to="/admin/confirmedAppointments">Confirmed Appointments</Link>
                    <Link to="/admin/services">Services</Link>
                    <Link to="/admin/employees">Employees</Link>
                </nav>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}