import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Pencil } from 'lucide-react';
import styles from './Page.module.css';

export default function StatesPage() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getStates();
      setStates(res?.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openEdit(state) {
    setEditing({ ...state });
    setMsg('');
  }

  function handleChange(e) {
    setEditing(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await api.updateState(editing.id, editing);
      setMsg('Saved successfully!');
      await load();
      setTimeout(() => setEditing(null), 800);
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    { key: 'name', label: 'Name', width: '180px' },
    { key: 'capital', label: 'Capital', width: '140px' },
    { key: 'best_season', label: 'Best Season', width: '140px' },
    { key: 'slug', label: 'Slug', width: '160px' },
    {
      key: 'actions', label: 'Actions', width: '80px',
      render: (_, row) => (
        <button className={styles.editBtn} onClick={() => openEdit(row)}>
          <Pencil size={14} /> Edit
        </button>
      )
    }
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>States</h1>
        <p className={styles.sub}>{states.length} states listed</p>
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={states} loading={loading} emptyMsg="No states found" />
      </div>

      {editing && (
        <Modal title={`Edit: ${editing.name}`} onClose={() => setEditing(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.grid2}>
              <FormField label="Name" name="name" value={editing.name} onChange={handleChange} required />
              <FormField label="Capital" name="capital" value={editing.capital} onChange={handleChange} />
            </div>
            <div className={styles.grid2}>
              <FormField label="Best Season" name="best_season" value={editing.best_season} onChange={handleChange} />
              <FormField label="Language" name="language" value={editing.language} onChange={handleChange} />
            </div>
            <FormField label="Tagline" name="tagline" value={editing.tagline} onChange={handleChange} />
            <FormField label="Description" name="description" type="textarea" rows={5} value={editing.description} onChange={handleChange} />
            <FormField label="Featured Image URL" name="featured_image" value={editing.featured_image} onChange={handleChange} />
            {msg && <div className={msg.startsWith('Error') ? styles.error : styles.success}>{msg}</div>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
