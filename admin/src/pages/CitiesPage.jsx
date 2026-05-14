import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = { name: '', slug: '', state_id: '', description: '', best_time_to_visit: '', featured_image: '' };

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', data }
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

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

  function openAdd() { setModal({ mode: 'add', data: { ...empty } }); setMsg(''); }
  function openEdit(row) { setModal({ mode: 'edit', data: { ...row } }); setMsg(''); }

  function handleChange(e) {
    setModal(m => ({ ...m, data: { ...m.data, [e.target.name]: e.target.value } }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      if (modal.mode === 'add') {
        await api.createCity(modal.data);
      } else {
        await api.updateCity(modal.data.id, modal.data);
      }
      setMsg('Saved!');
      await load();
      setTimeout(() => setModal(null), 600);
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this city?')) return;
    try {
      await api.deleteCity(id);
      await load();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  const stateOptions = states.map(s => ({ value: s.id, label: s.name }));

  const columns = [
    { key: 'name', label: 'City', width: '160px' },
    {
      key: 'state_id', label: 'State', width: '140px',
      render: (val) => states.find(s => s.id === val)?.name || val || '—'
    },
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

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Cities</h1>
          <p className={styles.sub}>{cities.length} cities</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Add City</button>
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={cities} loading={loading} emptyMsg="No cities found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add City' : `Edit: ${modal.data.name}`} onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.grid2}>
              <FormField label="City Name" name="name" value={modal.data.name} onChange={handleChange} required />
              <FormField label="Slug" name="slug" value={modal.data.slug} onChange={handleChange} required />
            </div>
            <div className={styles.grid2}>
              <FormField label="State" name="state_id" type="select" value={modal.data.state_id} onChange={handleChange} required options={stateOptions} />
              <FormField label="Best Time to Visit" name="best_time_to_visit" value={modal.data.best_time_to_visit} onChange={handleChange} />
            </div>
            <FormField label="Description" name="description" type="textarea" rows={4} value={modal.data.description} onChange={handleChange} />
            <FormField label="Featured Image URL" name="featured_image" value={modal.data.featured_image} onChange={handleChange} />
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
