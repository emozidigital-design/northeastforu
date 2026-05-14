import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import styles from './Page.module.css';

const empty = { title: '', slug: '', excerpt: '', content: '', featured_image: '', status: 'draft', author: '' };

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.getBlogs();
      setBlogs(res?.data || []);
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
        await api.createBlog(modal.data);
      } else {
        await api.updateBlog(modal.data.id, modal.data);
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
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.deleteBlog(id);
      await load();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const columns = [
    { key: 'title', label: 'Title', width: '280px', render: v => <span title={v}>{v?.slice(0, 60)}{v?.length > 60 ? '…' : ''}</span> },
    { key: 'author', label: 'Author', width: '120px' },
    {
      key: 'status', label: 'Status', width: '100px',
      render: v => <span className={`${styles.badge} ${v === 'published' ? styles.badgePublished : styles.badgeDraft}`}>{v || 'draft'}</span>
    },
    {
      key: 'created_at', label: 'Created', width: '120px',
      render: v => v ? new Date(v).toLocaleDateString() : '—'
    },
    {
      key: 'actions', label: '', width: '90px',
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
          <h1 className={styles.title}>Blog Posts</h1>
          <p className={styles.sub}>{blogs.length} posts</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            style={{ padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit', minWidth: 200 }}
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> New Post</button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <Table columns={columns} data={filtered} loading={loading} emptyMsg="No blog posts found" />
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'New Blog Post' : 'Edit Post'} onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave} className={styles.form}>
            <FormField label="Title" name="title" value={modal.data.title} onChange={handleChange} required />
            <div className={styles.grid2}>
              <FormField label="Slug" name="slug" value={modal.data.slug} onChange={handleChange} required />
              <FormField label="Status" name="status" type="select" value={modal.data.status} onChange={handleChange} options={statusOptions} />
            </div>
            <div className={styles.grid2}>
              <FormField label="Author" name="author" value={modal.data.author} onChange={handleChange} />
              <FormField label="Featured Image URL" name="featured_image" value={modal.data.featured_image} onChange={handleChange} />
            </div>
            <FormField label="Excerpt" name="excerpt" type="textarea" rows={2} value={modal.data.excerpt} onChange={handleChange} placeholder="Short summary..." />
            <FormField label="Content (Markdown)" name="content" type="textarea" rows={10} value={modal.data.content} onChange={handleChange} />
            {msg && <div className={msg.startsWith('Error') ? styles.error : styles.success}>{msg}</div>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
