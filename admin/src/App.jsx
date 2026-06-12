import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isLoggedIn, logout } from './lib/auth';
import { api } from './lib/api';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StatesPage from './pages/StatesPage';
import CitiesPage from './pages/CitiesPage';
import AttractionsPage from './pages/AttractionsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ItinerariesPage from './pages/ItinerariesPage';
import BookingsPage from './pages/BookingsPage';
import ReviewsPage from './pages/ReviewsPage';
import NewsletterPage from './pages/NewsletterPage';
import MediaPage from './pages/MediaPage';

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />; // "/" resolves to /admin (basename)
}

export default function App() {
  // Validate the stored token once on load; logout if it's invalid/expired.
  useEffect(() => {
    if (isLoggedIn()) {
      api.me().catch(() => logout());
    }
  }, []);

  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/" element={<Protected><Layout /></Protected>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="states" element={<StatesPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="attractions" element={<AttractionsPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="media" element={<MediaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
