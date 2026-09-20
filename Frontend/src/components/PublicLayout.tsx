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
                    <Link to="/house-rules">House Rules</Link>
                </nav>
                </header>
            <main>
                <Outlet />
            </main>
            <footer className="site-footer">
                <div className="footer-container">
                    
                    <div className="footer-contact">
                    <h3>Kapcsolat</h3>
                    <p>Telefon: <a href="tel:+36301234567">Valami telefonszám</a></p>
                    <p>E-mail: <a href="mailto:info@example.com">Valami e-mailcím</a></p>
                    </div>

                    <div className="footer-social">
                    <h3>Kövess minket</h3>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Minden jog fenntartva.</p>
                </div>
            </footer>
        </div>
    )
}