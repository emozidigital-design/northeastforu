import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import { Trash2, Download } from 'lucide-react';
import styles from './Page.module.css';

export default function NewsletterPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getSubscribers();
      setRows(res?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => r.email?.toLowerCase().includes(q) || r.name?.toLowerCase().includes(q));
  }, [rows, search]);

  async function handleDelete(id) {
    if (!confirm('Remove this subscriber?')) return;
    try { await api.deleteSubscriber(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'email', label: 'Email', width: '240px' },
    { key: 'name', label: 'Name', width: '160px' },
    { key: 'source_page', label: 'Source', width: '160px' },
    { key: 'is_active', label: 'Active', width: '80px', render: (v) => (v ? 'Yes' : 'No') },
    { key: 'subscribed_at', label: 'Subscribed', width: '120px', render: (v) => (v ? new Date(v).toLocaleDateString() : '—') },
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
          <h1 className={styles.title}>Newsletter</h1>
          <p className={styles.sub}>{rows.length} subscribers</p>
        </div>
        <button className={styles.secondaryBtn} onClick={() => api.exportSubscribers()}><Download size={15} /> Export CSV</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search subscribers…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No subscribers yet" />
      </div>
    </div>
  );
}
