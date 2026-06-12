import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import ImageField from '../components/editors/ImageField';
import JsonListField from '../components/editors/JsonListField';
import SeoFields from '../components/editors/SeoFields';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = {
  name: '', slug: '', state_id: '', description: '', best_time_to_visit: '',
  tagline: '', how_to_reach: '', budget_per_day: '', featured_image: '',
  gallery_images: [], seo_title: '', seo_description: ''
};

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const [c, s] = await Promise.all([api.getCities(), api.getStates()]);
      setCities(c?.data || []);
      setStates(s?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const stateOptions = states.map((s) => ({ value: s.id, label: s.name }));
  const stateName = (id) => states.find((s) => s.id === id)?.name || '—';

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return cities.filter((c) => c.name?.toLowerCase().includes(q) || c.slug?.toLowerCase().includes(q));
  }, [cities, search]);

  function openAdd() { setModal({ mode: 'add', data: { ...empty } }); setMsg(''); }
  function openEdit(row) { setModal({ mode: 'edit', data: { ...empty, ...row, gallery_images: row.gallery_images || [] } }); setMsg(''); }
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
      if (modal.mode === 'add') await api.createCity(modal.data);
      else await api.updateCity(modal.data.id, modal.data);
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
    if (!confirm('Delete this city?')) return;
    try { await api.deleteCity(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'name', label: 'City', width: '160px' },
    { key: 'state_id', label: 'State', width: '140px', render: (v, row) => row.state?.name || stateName(v) },
    { key: 'best_time_to_visit', label: 'Best Time', width: '140px' },
    { key: 'slug', label: 'Slug', width: '160px' },
    {
      key: 'actions', label: 'Actions', width: '120px',
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
          <h1 className={styles.title}>Cities</h1>
          <p className={styles.sub}>{cities.length} cities</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Add City</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search cities…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No cities found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add City' : `Edit: ${d.name}`} onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.grid2}>
              <FormField label="City Name" name="name" value={d.name} onChange={handleChange} required />
              <FormField label="Slug" name="slug" value={d.slug} onChange={handleChange} required />
            </div>
            <div className={styles.grid2}>
              <FormField label="State" name="state_id" type="select" value={d.state_id} onChange={handleChange} required options={stateOptions} />
              <FormField label="Best Time to Visit" name="best_time_to_visit" value={d.best_time_to_visit} onChange={handleChange} />
            </div>
            <FormField label="Tagline" name="tagline" value={d.tagline} onChange={handleChange} />
            <FormField label="Description" name="description" type="textarea" rows={4} value={d.description} onChange={handleChange} />
            <div className={styles.grid2}>
              <FormField label="Budget / Day (₹)" name="budget_per_day" type="number" value={d.budget_per_day} onChange={handleChange} />
              <div />
            </div>
            <FormField label="How to Reach" name="how_to_reach" type="textarea" rows={3} value={d.how_to_reach} onChange={handleChange} />
            <ImageField value={d.featured_image} onChange={(url) => setField('featured_image', url)} />
            <JsonListField label="Gallery Images" image value={d.gallery_images} onChange={(v) => setField('gallery_images', v)} />
            <SeoFields data={d} onChange={handleChange} />
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
