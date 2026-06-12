import { Plus, Trash2 } from 'lucide-react';
import styles from './Editors.module.css';

// Edits an array of { question, answer } objects.
// `value` may be an array or JSON string; `onChange` returns an array.
function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try { const p = JSON.parse(value); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
}

export default function FaqField({ label = 'FAQs', value, onChange }) {
  const items = toArray(value);

  const setAt = (i, key, v) => {
    const n = items.map((it) => ({ ...it }));
    n[i] = { ...n[i], [key]: v };
    onChange(n);
  };
  const removeAt = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { question: '', answer: '' }]);

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      {items.map((item, i) => (
        <div className={styles.faqItem} key={i}>
          <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} title="Remove" onClick={() => removeAt(i)}>
            <Trash2 size={14} />
          </button>
          <input
            className={styles.input}
            value={item.question || ''}
            onChange={(e) => setAt(i, 'question', e.target.value)}
            placeholder="Question"
          />
          <textarea
            className={styles.input}
            rows={2}
            value={item.answer || ''}
            onChange={(e) => setAt(i, 'answer', e.target.value)}
            placeholder="Answer"
          />
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        <Plus size={14} /> Add FAQ
      </button>
    </div>
  );
}
