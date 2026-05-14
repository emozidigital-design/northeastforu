import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { MapPin, Building2, FileText, Route, CalendarCheck, TrendingUp } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [counts, setCounts] = useState({ states: 0, cities: 0, blogs: 0, itineraries: 0, leads: 0 });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [states, cities, blogs, itineraries, leads] = await Promise.all([
          api.getStates(),
          api.getCities(),
          api.getBlogs(),
          api.getItineraries(),
          api.getLeads()
        ]);
        setCounts({
          states: states?.data?.length || 0,
          cities: cities?.data?.length || 0,
          blogs: blogs?.data?.length || 0,
          itineraries: itineraries?.data?.length || 0,
          leads: leads?.data?.length || 0
        });
        setRecentLeads((leads?.data || []).slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: 'States', value: counts.states, icon: MapPin, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'Cities', value: counts.cities, icon: Building2, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Blog Posts', value: counts.blogs, icon: FileText, color: '#a855f7', bg: '#faf5ff' },
    { label: 'Itineraries', value: counts.itineraries, icon: Route, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Bookings', value: counts.leads, icon: CalendarCheck, color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.sub}>Welcome back to NorthEastForU Admin</p>
      </div>

      <div className={styles.grid}>
        {cards.map(card => (
          <div key={card.label} className={styles.card} style={{ '--bg': card.bg, '--color': card.color }}>
            <div className={styles.cardIcon} style={{ background: card.bg }}>
              <card.icon size={22} color={card.color} />
            </div>
            <div>
              <div className={styles.cardValue}>{loading ? '—' : card.value}</div>
              <div className={styles.cardLabel}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <TrendingUp size={18} />
          <h2>Recent Bookings</h2>
        </div>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : recentLeads.length === 0 ? (
          <p className={styles.empty}>No bookings yet.</p>
        ) : (
          <div className={styles.leadList}>
            {recentLeads.map(lead => (
              <div key={lead.id} className={styles.leadRow}>
                <div className={styles.leadInfo}>
                  <span className={styles.leadName}>{lead.name || 'Unknown'}</span>
                  <span className={styles.leadEmail}>{lead.email}</span>
                </div>
                <div className={styles.leadMeta}>
                  <span className={styles.leadDest}>{lead.destination || '—'}</span>
                  <span className={`${styles.badge} ${styles[lead.status] || styles.new}`}>{lead.status || 'new'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
