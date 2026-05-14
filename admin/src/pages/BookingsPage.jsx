import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import { Trash2, RefreshCw } from 'lucide-react';
import styles from './Page.module.css';

const STATUS_OPTIONS = ['new', 'contacted', 'confirmed', 'cancelled'];

export default function BookingsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getLeads();
      setLeads(res?.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleStatusChange(id, status) {
    try {
      await api.updateLeadStatus(id, status);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this booking?')) return;
    try {
      await api.deleteLead(id);
      await load();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => (l.status || 'new') === filter);

  function getBadgeClass(s) {
    if (s === 'confirmed') return styles.badgeConfirmed;
    if (s === 'contacted') return styles.badgeContacted;
    if (s === 'cancelled') return styles.badgeCancelled;
    return styles.badgeNew;
  }

  const columns = [
    { key: 'name', label: 'Name', width: '160px' },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'phone', label: 'Phone', width: '130px' },
    { key: 'destination', label: 'Destination', width: '160px' },
    { key: 'travel_date', label: 'Travel Date', width: '130px', render: v => v ? new Date(v).toLocaleDateString() : '—' },
    { key: 'guests', label: 'Guests', width: '80px' },
    {
      key: 'status', label: 'Status', width: '160px',
      render: (v, row) => (
        <select
          value={v || 'new'}
          onChange={e => handleStatusChange(row.id, e.target.value)}
          style={{
            padding: '5px 8px', border: '1.5px solid #e2e8f0', borderRadius: 8,
            fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
            background: '#fff', fontWeight: 600
          }}
        >
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      )
    },
    {
      key: 'created_at', label: 'Submitted', width: '120px',
      render: v => v ? new Date(v).toLocaleDateString() : '—'
    },
    {
      key: 'actions', label: '', width: '60px',
      render: (_, row) => (
        <button className={styles.deleteBtn} onClick={() => handleDelete(row.id)}><Trash2 size={13} /></button>
      )
    }
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Bookings</h1>
          <p className={styles.sub}>{leads.length} total enquiries</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff' }}
          >
            <option value="all">All</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={load} style={{ background: '#f1f5f9', border: 'none', padding: '9px 12px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <RefreshCw size={16} color="#64748b" />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {STATUS_OPTIONS.map(s => {
          const count = leads.filter(l => (l.status || 'new') === s).length;
          return (
            <div key={s} onClick={() => setFilter(s === filter ? 'all' : s)} style={{
              background: filter === s ? '#0f172a' : '#fff',
              color: filter === s ? '#fff' : '#64748b',
              border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 16px',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span style={{ textTransform: 'capitalize' }}>{s}</span>
              <span style={{
                background: filter === s ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                borderRadius: 20, padding: '1px 8px', fontSize: 12
              }}>{count}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No bookings found" />
      </div>
    </div>
  );
}
