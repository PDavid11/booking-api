import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import AboutUsPage from './pages/AboutUsPage'
import GalleryPage from './pages/GalleryPage'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />

          <Route path="/booking" element={<BookingPage />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="/about" element={<AboutUsPage />} />

          <Route path="/gallery" element={<GalleryPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App