import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import ImageField from '../components/editors/ImageField';
import SeoFields from '../components/editors/SeoFields';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = {
  name: '', slug: '', city_id: '', description: '', location: '',
  category: '', entry_fee: '', best_time: '', timings: '',
  featured_image: '', seo_title: '', seo_description: ''
};

export default function AttractionsPage() {
  const [rows, setRows] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const [a, c] = await Promise.all([api.getAttractions(), api.getCities()]);
      setRows(a?.data || []);
      setCities(c?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const cityOptions = cities.map((c) => ({ value: c.id, label: c.name }));
  const cityName = (id) => cities.find((c) => c.id === id)?.name || '—';

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => r.name?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q));
  }, [rows, search]);

  function openAdd() { setModal({ mode: 'add', data: { ...empty } }); setMsg(''); }
  function openEdit(row) { setModal({ mode: 'edit', data: { ...row } }); setMsg(''); }
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
      if (modal.mode === 'add') await api.createAttraction(modal.data);
      else await api.updateAttraction(modal.data.id, modal.data);
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
    if (!confirm('Delete this attraction?')) return;
    try { await api.deleteAttraction(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'name', label: 'Attraction', width: '180px' },
    { key: 'city_id', label: 'City', width: '130px', render: (v) => cityName(v) },
    { key: 'category', label: 'Category', width: '120px' },
    { key: 'best_time', label: 'Best Time', width: '120px' },
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

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Attractions</h1>
          <p className={styles.sub}>{rows.length} attractions</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Add Attraction</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search attractions…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No attractions found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Attraction' : `Edit: ${modal.data.name}`} onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.grid2}>
              <FormField label="Name" name="name" value={modal.data.name} onChange={handleChange} required />
              <FormField label="Slug" name="slug" value={modal.data.slug} onChange={handleChange} required />
            </div>
            <div className={styles.grid2}>
              <FormField label="City" name="city_id" type="select" value={modal.data.city_id} onChange={handleChange} required options={cityOptions} />
              <FormField label="Category" name="category" value={modal.data.category} onChange={handleChange} placeholder="temple, nature, heritage…" />
            </div>
            <FormField label="Description" name="description" type="textarea" rows={4} value={modal.data.description} onChange={handleChange} />
            <div className={styles.grid2}>
              <FormField label="Location" name="location" value={modal.data.location} onChange={handleChange} />
              <FormField label="Best Time" name="best_time" value={modal.data.best_time} onChange={handleChange} />
            </div>
            <div className={styles.grid2}>
              <FormField label="Entry Fee" name="entry_fee" value={modal.data.entry_fee} onChange={handleChange} />
              <FormField label="Timings" name="timings" value={modal.data.timings} onChange={handleChange} placeholder="e.g. 9 AM – 5 PM" />
            </div>
            <ImageField value={modal.data.featured_image} onChange={(url) => setField('featured_image', url)} />
            <SeoFields data={modal.data} onChange={handleChange} />
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
