import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import SearchArtists from './pages/SearchArtists';
import CompareArtists from './pages/CompareArtists';
import ArtistDetails from './pages/ArtistDetails';
import PriceCalculatorPage from './pages/PriceCalculatorPage';
import EventPlannerPage from './pages/EventPlannerPage';
import BookingFormPage from './pages/BookingFormPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import BookingTrackerPage from './pages/BookingTrackerPage';
import BackupArtistPage from './pages/BackupArtistPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HelpPage from './pages/HelpPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import PhotosPage from './pages/PhotosPage';
import VideoPage from './pages/VideoPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <BookingProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-[#faf7f2] text-stone-900 selection:bg-amber-200 selection:text-amber-900 font-sans-custom">
                {/* Navbar */}
                <Navbar />

                {/* Main Content View */}
                <main className="flex-1 w-full">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/photos" element={<PhotosPage />} />
                    <Route path="/video" element={<VideoPage />} />
                    <Route path="/search" element={<SearchArtists />} />
                    <Route path="/compare" element={<CompareArtists />} />
                    <Route path="/artist/:id" element={<ArtistDetails />} />
                    <Route path="/calculator" element={<PriceCalculatorPage />} />
                    <Route path="/planner" element={<EventPlannerPage />} />
                    <Route path="/book/:artistId?" element={<BookingFormPage />} />
                    <Route path="/confirmation/:bookingId" element={<BookingConfirmationPage />} />
                    <Route path="/tracker" element={<BookingTrackerPage />} />
                    <Route path="/backup/:bookingId?" element={<BackupArtistPage />} />
                    <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                    <Route path="/dashboard/artist" element={<ArtistDashboard />} />
                    <Route path="/dashboard/admin" element={<AdminDashboard />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}
