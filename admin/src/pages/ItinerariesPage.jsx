import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import ImageField from '../components/editors/ImageField';
import JsonListField from '../components/editors/JsonListField';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = {
  title: '', slug: '', category: '', duration_days: '', price_estimate: '',
  description: '', featured_image: '', highlights: []
};

const categoryOptions = [
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Cultural', label: 'Cultural' },
  { value: 'Wildlife', label: 'Wildlife' },
  { value: 'Nature', label: 'Nature' },
  { value: 'Budget', label: 'Budget' },
  { value: 'Luxury', label: 'Luxury' },
];

export default function ItinerariesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

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

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((r) => r.title?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q));
  }, [items, search]);

  function openAdd() { setModal({ mode: 'add', data: { ...empty } }); setMsg(''); }
  function openEdit(row) { setModal({ mode: 'edit', data: { ...empty, ...row } }); setMsg(''); }
  function handleChange(e) {
    setModal((m) => ({ ...m, data: { ...m.data, [e.target.name]: e.target.value } }));
  }
  function setField(name, value) {
    setModal((m) => ({ ...m, data: { ...m.data, [name]: value } }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setMsg('');
    try {
      if (modal.mode === 'add') await api.createItinerary(modal.data);
      else await api.updateItinerary(modal.data.id, modal.data);
      setMsg('Saved!');
      await load();
      setTimeout(() => setModal(null), 500);
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this itinerary?')) return;
    try { await api.deleteItinerary(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'title', label: 'Title', width: '260px', render: (v) => <span title={v}>{v?.slice(0, 60)}{v?.length > 60 ? '…' : ''}</span> },
    { key: 'category', label: 'Category', width: '110px' },
    { key: 'duration_days', label: 'Days', width: '70px' },
    { key: 'price_estimate', label: 'Price', width: '100px', render: (v) => (v ? `₹${Number(v).toLocaleString()}` : '—') },
    {
      key: 'actions', label: 'Actions', width: '110px',
      render: (_, row) => (
        <div className={styles.btnRow}>
          <button className={styles.editBtn} onClick={() => openEdit(row)}><Pencil size={13} /></button>
          <button className={styles.deleteBtn} onClick={() => handleDelete(row.id)}><Trash2 size={13} /></button>
        </div>
      )
    }
  ];

  const d = modal?.data || {};

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Itineraries</h1>
          <p className={styles.sub}>{items.length} packages</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> New Itinerary</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search itineraries…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No itineraries found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'New Itinerary' : `Edit: ${d.title}`} onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <FormField label="Title" name="title" value={d.title} onChange={handleChange} required />
            <div className={styles.grid2}>
              <FormField label="Slug" name="slug" value={d.slug} onChange={handleChange} required />
              <FormField label="Category" name="category" type="select" value={d.category} onChange={handleChange} options={categoryOptions} />
            </div>
            <div className={styles.grid2}>
              <FormField label="Duration (days)" name="duration_days" type="number" value={d.duration_days} onChange={handleChange} required />
              <FormField label="Price Estimate (₹)" name="price_estimate" type="number" value={d.price_estimate} onChange={handleChange} />
            </div>
            <ImageField value={d.featured_image} onChange={(url) => setField('featured_image', url)} />
            <FormField label="Description" name="description" type="textarea" rows={4} value={d.description} onChange={handleChange} />
            <JsonListField label="Highlights" value={d.highlights} onChange={(v) => setField('highlights', v)} />
            {msg && <div className={msg.startsWith('Error') ? styles.error : styles.success}>{msg}</div>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
