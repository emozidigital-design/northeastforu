import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './lib/auth';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StatesPage from './pages/StatesPage';
import CitiesPage from './pages/CitiesPage';
import BlogsPage from './pages/BlogsPage';
import ItinerariesPage from './pages/ItinerariesPage';
import BookingsPage from './pages/BookingsPage';

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/" element={<Protected><Layout /></Protected>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="states" element={<StatesPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
