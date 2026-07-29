import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Landing Page</h1>

            <Link to="/booking" className="btn-primary">
                BookingPage
            </Link>

            <div>
                <Link to="/admin" className="btn-primary">
                    AdminPage
                </Link>
            </div>       
        </div>
    )
}