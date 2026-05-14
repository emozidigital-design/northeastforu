import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Plus } from 'lucide-react';
import styles from './Page.module.css';

const empty = {
  title: '', slug: '', category: '', duration: '', price: '',
  description: '', featured_image: '', highlights: ''
};

export default function ItinerariesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getItineraries();
      setItems(res?.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleChange(e) {
    setModal(m => ({ ...m, data: { ...m.data, [e.target.name]: e.target.value } }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await api.createItinerary(modal.data);
      setMsg('Created!');
      await load();
      setTimeout(() => setModal(null), 600);
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  const categoryOptions = [
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Wildlife', label: 'Wildlife' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Budget', label: 'Budget' },
    { value: 'Luxury', label: 'Luxury' },
  ];

  const columns = [
    { key: 'title', label: 'Title', width: '280px', render: v => <span title={v}>{v?.slice(0, 60)}{v?.length > 60 ? '…' : ''}</span> },
    { key: 'category', label: 'Category', width: '120px' },
    { key: 'duration', label: 'Duration', width: '120px' },
    { key: 'price', label: 'Price', width: '100px', render: v => v ? `₹${Number(v).toLocaleString()}` : '—' },
    {
      key: 'created_at', label: 'Created', width: '120px',
      render: v => v ? new Date(v).toLocaleDateString() : '—'
    }
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Itineraries</h1>
          <p className={styles.sub}>{items.length} packages</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setModal({ data: { ...empty } }); setMsg(''); }}>
          <Plus size={16} /> New Itinerary
        </button>
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={items} loading={loading} emptyMsg="No itineraries found" />
      </div>

      {modal && (
        <Modal title="New Itinerary" onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <FormField label="Title" name="title" value={modal.data.title} onChange={handleChange} required />
            <div className={styles.grid2}>
              <FormField label="Slug" name="slug" value={modal.data.slug} onChange={handleChange} required />
              <FormField label="Category" name="category" type="select" value={modal.data.category} onChange={handleChange} options={categoryOptions} />
            </div>
            <div className={styles.grid2}>
              <FormField label="Duration (e.g. 5 Days)" name="duration" value={modal.data.duration} onChange={handleChange} />
              <FormField label="Price (₹)" name="price" type="number" value={modal.data.price} onChange={handleChange} />
            </div>
            <FormField label="Featured Image URL" name="featured_image" value={modal.data.featured_image} onChange={handleChange} />
            <FormField label="Description" name="description" type="textarea" rows={4} value={modal.data.description} onChange={handleChange} />
            <FormField label="Highlights (comma separated)" name="highlights" value={modal.data.highlights} onChange={handleChange} />
            {msg && <div className={msg.startsWith('Error') ? styles.error : styles.success}>{msg}</div>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Creating...' : 'Create Itinerary'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
