import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { api } from '../../lib/api';
import styles from './Editors.module.css';

// A URL text input + "Upload" button. Uploading sends the file to the backend
// (Cloudinary) and fills the field with the returned secure URL.
// onChange(url) is called whenever the value changes.
export default function ImageField({ label = 'Featured Image', value, onChange, name }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr('');
    try {
      const res = await api.uploadImage(file);
      onChange(res.url);
    } catch (e) {
      setErr(e.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.imageRow}>
        {value ? <img src={value} alt="" className={styles.thumb} /> : <div className={styles.thumb} />}
        <input
          className={styles.input}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://res.cloudinary.com/... or upload"
        />
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          <Upload size={14} />
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handleFile}
        />
      </div>
      {err && <div className={styles.uploadErr}>{err}</div>}
    </div>
  );
}
