import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [psw, setPsw] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, psw })
            })

            const data = await response.json()

            if (data.success === false) {
                alert(data.message || 'Login failed')
                throw new Error(data.message || 'Login failed')
            }

            localStorage.setItem('token', data.token)
            navigate('/admin')
        } catch (err: any) {
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Link to="/">Back to Landing Page</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={psw}
                        onChange={(e) => setPsw(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}