import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../lib/auth';
import {
  LayoutDashboard, MapPin, Building2, Landmark, Mountain,
  Route, CalendarCheck, Star, Mail, Image, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import styles from './Layout.module.css';

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/states', icon: MapPin, label: 'States' },
  { to: '/cities', icon: Building2, label: 'Cities' },
  { to: '/attractions', icon: Landmark, label: 'Attractions' },
  { to: '/activities', icon: Mountain, label: 'Activities' },
  { to: '/itineraries', icon: Route, label: 'Itineraries' },
  { to: '/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/reviews', icon: Star, label: 'Reviews' },
  { to: '/newsletter', icon: Mail, label: 'Newsletter' },
  { to: '/media', icon: Image, label: 'Media' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <span className={styles.logoDot}></span>
          <span>NorthEastForU</span>
          <button className={styles.closeMobile} onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <nav className={styles.nav}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className={styles.userBox}>
            <div className={styles.userName}>{user.name || user.email}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        )}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.header}>
          <button className={styles.menuBtn} onClick={() => setOpen(true)}><Menu size={20} /></button>
          <span className={styles.headerTitle}>Admin Panel</span>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
