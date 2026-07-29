import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />

          <Route path="/booking" element={<BookingPage />} />

          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App