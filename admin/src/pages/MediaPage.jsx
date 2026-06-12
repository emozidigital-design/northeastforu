import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import { Upload, Copy, Trash2, Check } from 'lucide-react';
import pageStyles from './Page.module.css';
import styles from './MediaPage.module.css';

export default function MediaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileRef = useRef(null);

  async function load() {
    setLoading(true);
    try {
      const res = await api.getMedia();
      setItems(res?.data || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function handleUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        await api.uploadImage(file);
      }
      await load();
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function copyUrl(item) {
    await navigator.clipboard.writeText(item.file_url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this image? It will be removed from Cloudinary.')) return;
    try { await api.deleteMedia(id); await load(); }
    catch (err) { alert('Error: ' + err.message); }
  }

  return (
    <div>
      <div className={pageStyles.pageHeader}>
        <div>
          <h1 className={pageStyles.title}>Media Library</h1>
          <p className={pageStyles.sub}>{items.length} images</p>
        </div>
        <button className={pageStyles.addBtn} onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Upload size={16} /> {uploading ? 'Uploading…' : 'Upload Images'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleUpload} />
      </div>

      {loading ? (
        <p className={styles.loading}>Loading…</p>
      ) : !items.length ? (
        <p className={styles.empty}>No images yet. Upload some to get started.</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.file_url} alt={item.alt_text || item.file_name} className={styles.img} />
              <div className={styles.cardBody}>
                <div className={styles.fileName} title={item.file_name}>{item.file_name}</div>
                <div className={styles.cardActions}>
                  <button className={styles.iconBtn} title="Copy URL" onClick={() => copyUrl(item)}>
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button className={`${styles.iconBtn} ${styles.del}`} title="Delete" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
