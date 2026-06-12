import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import {
  MapPin, Building2, Landmark, Mountain, Route,
  CalendarCheck, Star, Mail, TrendingUp, ExternalLink
} from 'lucide-react';
import styles from './Dashboard.module.css';

const EMOZI_CMS = 'https://admin.emozidigital.com';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStats()
      .then((res) => setData(res?.data || null))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const c = data?.counts || {};
  const cards = [
    { label: 'States', value: c.states, icon: MapPin, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'Cities', value: c.cities, icon: Building2, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Attractions', value: c.attractions, icon: Landmark, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Activities', value: c.activities, icon: Mountain, color: '#0ea5e9', bg: '#f0f9ff' },
    { label: 'Itineraries', value: c.itineraries, icon: Route, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Bookings', value: c.leads, icon: CalendarCheck, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Reviews Pending', value: c.reviewsPending, icon: Star, color: '#eab308', bg: '#fefce8' },
    { label: 'Subscribers', value: c.subscribers, icon: Mail, color: '#14b8a6', bg: '#f0fdfa' },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.sub}>Welcome back to NorthEastForU Admin</p>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.card}>
            <div className={styles.cardIcon} style={{ background: card.bg }}>
              <card.icon size={22} color={card.color} />
            </div>
            <div>
              <div className={styles.cardValue}>{loading ? '—' : (card.value ?? 0)}</div>
              <div className={styles.cardLabel}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Blogs live in the external Emozi CMS */}
      <a className={styles.blogCard} href={EMOZI_CMS} target="_blank" rel="noopener noreferrer">
        <div>
          <div className={styles.blogTitle}>Blogs are managed in the Emozi CMS</div>
          <div className={styles.blogSub}>Author posts at admin.emozidigital.com — they appear on the site automatically.</div>
        </div>
        <ExternalLink size={18} />
      </a>

      <div className={styles.recentGrid}>
        <div className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <TrendingUp size={18} />
            <h2>Recent Bookings</h2>
          </div>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : !data?.recentLeads?.length ? (
            <p className={styles.empty}>No bookings yet.</p>
          ) : (
            <div className={styles.leadList}>
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className={styles.leadRow}>
                  <div className={styles.leadInfo}>
                    <span className={styles.leadName}>{lead.name || 'Unknown'}</span>
                    <span className={styles.leadEmail}>{lead.email}</span>
                  </div>
                  <div className={styles.leadMeta}>
                    <span className={styles.leadDest}>{lead.destination || '—'}</span>
                    <span className={`${styles.badge} ${styles[(lead.status || 'new').toLowerCase()] || styles.new}`}>
                      {lead.status || 'new'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <Star size={18} />
            <h2>Reviews Awaiting Approval</h2>
          </div>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : !data?.recentReviews?.length ? (
            <p className={styles.empty}>Nothing pending. 🎉</p>
          ) : (
            <div className={styles.leadList}>
              {data.recentReviews.map((r) => (
                <div key={r.id} className={styles.leadRow}>
                  <div className={styles.leadInfo}>
                    <span className={styles.leadName}>{r.reviewer_name || 'Anonymous'}</span>
                    <span className={styles.leadEmail}>{r.page_type}/{r.page_slug}</span>
                  </div>
                  <div className={styles.leadMeta}>
                    <span className={styles.leadDest}>★ {r.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
