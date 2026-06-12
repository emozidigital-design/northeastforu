import { useRef, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { api } from '../../lib/api';
import styles from './Editors.module.css';

// Edits an array of strings (highlights, inclusions, gallery image URLs, …).
// `value` may be an array or a JSON string; `onChange` always returns an array.
// Set `image` to show a per-row Cloudinary upload button (for gallery URLs).
function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try { const p = JSON.parse(value); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
}

export default function JsonListField({ label, value, onChange, placeholder, image = false }) {
  const items = toArray(value);
  const fileRefs = useRef({});
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const update = (next) => onChange(next);
  const setAt = (i, v) => { const n = [...items]; n[i] = v; update(n); };
  const removeAt = (i) => update(items.filter((_, idx) => idx !== i));
  const add = () => update([...items, '']);

  async function uploadAt(i, file) {
    if (!file) return;
    setUploadingIdx(i);
    try {
      const res = await api.uploadImage(file);
      setAt(i, res.url);
    } catch (e) {
      alert('Upload failed: ' + e.message);
    } finally {
      setUploadingIdx(null);
    }
  }

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      {items.map((item, i) => (
        <div className={styles.listRow} key={i}>
          {image && (item ? <img src={item} alt="" className={styles.thumb} /> : <div className={styles.thumb} />)}
          <input
            className={styles.input}
            value={item}
            onChange={(e) => setAt(i, e.target.value)}
            placeholder={placeholder || (image ? 'Image URL' : 'Item')}
          />
          {image && (
            <>
              <button
                type="button"
                className={styles.iconBtn}
                title="Upload"
                onClick={() => fileRefs.current[i]?.click()}
                disabled={uploadingIdx === i}
              >
                <Upload size={15} />
              </button>
              <input
                ref={(el) => (fileRefs.current[i] = el)}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={(e) => uploadAt(i, e.target.files?.[0])}
              />
            </>
          )}
          <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} title="Remove" onClick={() => removeAt(i)}>
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        <Plus size={14} /> Add {label || 'item'}
      </button>
    </div>
  );
}
