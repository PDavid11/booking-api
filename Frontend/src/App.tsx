import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import AboutUsPage from './pages/AboutUsPage'
import GalleryPage from './pages/GalleryPage'
import LoginPage from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />

          <Route path="/booking" element={<BookingPage />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />

          <Route path="/about" element={<AboutUsPage />} />

          <Route path="/gallery" element={<GalleryPage />} />
          
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App