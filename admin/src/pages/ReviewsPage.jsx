import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import { Check, X, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

export default function ReviewsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getReviews(filter);
      setRows(res?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, [filter]);

  async function toggleApprove(row) {
    try { await api.approveReview(row.id, !row.is_approved); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }
  async function handleDelete(id) {
    if (!confirm('Delete this review?')) return;
    try { await api.deleteReview(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'reviewer_name', label: 'Reviewer', width: '140px' },
    { key: 'rating', label: 'Rating', width: '90px', render: (v) => '★'.repeat(v || 0) },
    { key: 'page_slug', label: 'Page', width: '180px', render: (v, row) => `${row.page_type}/${v}` },
    { key: 'review_text', label: 'Review', render: (v) => <span title={v}>{v?.slice(0, 80)}{v?.length > 80 ? '…' : ''}</span> },
    {
      key: 'actions', label: 'Actions', width: '150px',
      render: (_, row) => (
        <div className={styles.btnRow}>
          <button
            className={`${styles.toggleBtn} ${row.is_approved ? styles.unapproveBtn : styles.approveBtn}`}
            onClick={() => toggleApprove(row)}
          >
            {row.is_approved ? <><X size={13} /> Unapprove</> : <><Check size={13} /> Approve</>}
          </button>
          <button className={styles.deleteBtn} onClick={() => handleDelete(row.id)}><Trash2 size={13} /></button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.sub}>{rows.length} {filter === 'all' ? 'total' : filter}</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="pending">Pending approval</option>
          <option value="approved">Approved</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={rows} loading={loading} emptyMsg="No reviews found" />
      </div>
    </div>
  );
}
