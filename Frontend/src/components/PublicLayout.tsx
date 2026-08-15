import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const PublicLayout: React.FC = () => {
    return (
        <div>
            <header>
                <div>
                    <h2>Header</h2>
                </div>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/booking">Booking</Link>
                </nav>
                </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}