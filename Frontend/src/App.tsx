import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AboutUsPage from './pages/AboutUsPage'
import GalleryPage from './pages/GalleryPage'
import LoginPage from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout } from './components/AdminLayout'
import { ServicePage } from './pages/ServicePage'
import { EmployeePage } from './pages/employeePage'
import { ConfirmedAppointmentsPage } from './pages/ConfirmedAppointmentsPage'
import { PublicLayout } from './components/PublicLayout'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          } >
            <Route index element={<Navigate to="appointments" replace />}/>
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="services" element={<ServicePage />} />
            <Route path="employees" element={<EmployeePage />} />
            <Route path="confirmedappointments" element={<ConfirmedAppointmentsPage />} />

          </Route>

          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App