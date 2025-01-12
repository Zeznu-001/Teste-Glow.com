import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Gallery from './components/sections/Gallery';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';
import BookingModal from './components/modals/BookingModal';
import SoundPlayer from './components/audio/SoundPlayer';
import { useBooking } from './hooks/useBooking';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {
  const { bookingState, openBooking, closeBooking } = useBooking();

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* Main Site Routes */}
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navbar onBooking={() => openBooking()} />
            <Hero 
              onBooking={() => openBooking()} 
              onViewServices={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
            />
            <Services onBooking={openBooking} />
            <Gallery />
            <Team />
            <Contact />
            <BookingModal 
              isOpen={bookingState.isOpen}
              onClose={closeBooking}
              selectedService={bookingState.selectedService}
            />
            <SoundPlayer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;