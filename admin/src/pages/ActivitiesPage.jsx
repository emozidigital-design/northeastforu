import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import ImageField from '../components/editors/ImageField';
import JsonListField from '../components/editors/JsonListField';
import FaqField from '../components/editors/FaqField';
import SeoFields from '../components/editors/SeoFields';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = {
  name: '', slug: '', city_id: '', state_id: '', description: '', category: 'Adventure',
  difficulty: 'Moderate', duration: '', best_season: '', booking_link: '', featured_image: '',
  price: '', price_original: '', price_discounted: '',
  group_size_min: 1, group_size_max: 15, age_requirement: '', physical_rating: 'Moderate',
  meeting_point: '', meeting_point_lat: '', meeting_point_lng: '',
  cancellation_policy: '', instant_confirmation: true, free_cancellation: true, is_published: true,
  gallery_images: [], highlights: [], inclusions: [], exclusions: [], what_to_bring: [], languages: [], faqs: [],
  seo_title: '', seo_description: ''
};

const TABS = ['Basics', 'Pricing & Logistics', 'Details', 'Media & SEO'];

export default function ActivitiesPage() {
  const [rows, setRows] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const [a, c, s] = await Promise.all([api.getActivities(), api.getCities(), api.getStates()]);
      setRows(a?.data || []);
      setCities(c?.data || []);
      setStates(s?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const cityOptions = cities.map((c) => ({ value: c.id, label: c.name }));
  const stateOptions = states.map((s) => ({ value: s.id, label: s.name }));
  const cityName = (id) => cities.find((c) => c.id === id)?.name || '—';

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => r.name?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q));
  }, [rows, search]);

  function openAdd() { setModal({ mode: 'add', data: { ...empty } }); setTab(0); setMsg(''); }
  function openEdit(row) { setModal({ mode: 'edit', data: { ...empty, ...row } }); setTab(0); setMsg(''); }
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setModal((m) => ({ ...m, data: { ...m.data, [name]: type === 'checkbox' ? checked : value } }));
  }
  function setField(name, value) {
    setModal((m) => ({ ...m, data: { ...m.data, [name]: value } }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setMsg('');
    try {
      if (modal.mode === 'add') await api.createActivity(modal.data);
      else await api.updateActivity(modal.data.id, modal.data);
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
    if (!confirm('Delete this activity?')) return;
    try { await api.deleteActivity(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  const columns = [
    { key: 'name', label: 'Activity', width: '200px' },
    { key: 'city_id', label: 'City', width: '120px', render: (v) => cityName(v) },
    { key: 'category', label: 'Category', width: '110px' },
    { key: 'price', label: 'Price', width: '90px', render: (v) => (v ? `₹${v}` : '—') },
    { key: 'is_published', label: 'Status', width: '90px', render: (v) => (v ? <span className={`${styles.badge} ${styles.badgePublished}`}>Live</span> : <span className={`${styles.badge} ${styles.badgeDraft}`}>Draft</span>) },
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
          <h1 className={styles.title}>Activities</h1>
          <p className={styles.sub}>{rows.length} activities</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Add Activity</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search activities…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No activities found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Activity' : `Edit: ${d.name}`} onClose={() => setModal(null)} wide>
          <div className={styles.tabBar}>
            {TABS.map((t, i) => (
              <button key={t} type="button" className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`} onClick={() => setTab(i)}>{t}</button>
            ))}
          </div>
          <form onSubmit={handleSave} className={styles.form}>
            {tab === 0 && (
              <>
                <div className={styles.grid2}>
                  <FormField label="Name" name="name" value={d.name} onChange={handleChange} required />
                  <FormField label="Slug" name="slug" value={d.slug} onChange={handleChange} required />
                </div>
                <div className={styles.grid2}>
                  <FormField label="State" name="state_id" type="select" value={d.state_id} onChange={handleChange} options={stateOptions} />
                  <FormField label="City" name="city_id" type="select" value={d.city_id} onChange={handleChange} options={cityOptions} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Category" name="category" value={d.category} onChange={handleChange} />
                  <FormField label="Best Season" name="best_season" value={d.best_season} onChange={handleChange} />
                </div>
                <FormField label="Description" name="description" type="textarea" rows={4} value={d.description} onChange={handleChange} />
                <label className={styles.checkRow}>
                  <input type="checkbox" name="is_published" checked={!!d.is_published} onChange={handleChange} /> Published (visible on site)
                </label>
              </>
            )}

            {tab === 1 && (
              <>
                <div className={styles.grid2}>
                  <FormField label="Duration" name="duration" value={d.duration} onChange={handleChange} placeholder="e.g. 3 hours" />
                  <FormField label="Difficulty" name="difficulty" value={d.difficulty} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Price (₹)" name="price" type="number" value={d.price} onChange={handleChange} />
                  <FormField label="Original Price (₹)" name="price_original" type="number" value={d.price_original} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Discounted Price (₹)" name="price_discounted" type="number" value={d.price_discounted} onChange={handleChange} />
                  <FormField label="Booking Link" name="booking_link" value={d.booking_link} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Group Size Min" name="group_size_min" type="number" value={d.group_size_min} onChange={handleChange} />
                  <FormField label="Group Size Max" name="group_size_max" type="number" value={d.group_size_max} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Age Requirement" name="age_requirement" value={d.age_requirement} onChange={handleChange} />
                  <FormField label="Physical Rating" name="physical_rating" value={d.physical_rating} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Meeting Point" name="meeting_point" value={d.meeting_point} onChange={handleChange} />
                  <JsonListField label="Languages" value={d.languages} onChange={(v) => setField('languages', v)} placeholder="English" />
                </div>
                <div className={styles.grid2}>
                  <FormField label="Meeting Lat" name="meeting_point_lat" value={d.meeting_point_lat} onChange={handleChange} />
                  <FormField label="Meeting Lng" name="meeting_point_lng" value={d.meeting_point_lng} onChange={handleChange} />
                </div>
                <FormField label="Cancellation Policy" name="cancellation_policy" type="textarea" rows={2} value={d.cancellation_policy} onChange={handleChange} />
                <div className={styles.checkRowGroup}>
                  <label className={styles.checkRow}>
                    <input type="checkbox" name="instant_confirmation" checked={!!d.instant_confirmation} onChange={handleChange} /> Instant confirmation
                  </label>
                  <label className={styles.checkRow}>
                    <input type="checkbox" name="free_cancellation" checked={!!d.free_cancellation} onChange={handleChange} /> Free cancellation
                  </label>
                </div>
              </>
            )}

            {tab === 2 && (
              <>
                <JsonListField label="Highlights" value={d.highlights} onChange={(v) => setField('highlights', v)} />
                <JsonListField label="Inclusions" value={d.inclusions} onChange={(v) => setField('inclusions', v)} />
                <JsonListField label="Exclusions" value={d.exclusions} onChange={(v) => setField('exclusions', v)} />
                <JsonListField label="What to Bring" value={d.what_to_bring} onChange={(v) => setField('what_to_bring', v)} />
                <FaqField value={d.faqs} onChange={(v) => setField('faqs', v)} />
              </>
            )}

            {tab === 3 && (
              <>
                <ImageField label="Featured Image" value={d.featured_image} onChange={(url) => setField('featured_image', url)} />
                <JsonListField label="Gallery Images" image value={d.gallery_images} onChange={(v) => setField('gallery_images', v)} />
                <SeoFields data={d} onChange={handleChange} />
              </>
            )}

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
