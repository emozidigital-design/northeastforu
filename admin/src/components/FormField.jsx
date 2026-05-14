import styles from './FormField.module.css';

export default function FormField({ label, name, type = 'text', value, onChange, required, rows, options, placeholder }) {
  const id = `field_${name}`;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}{required && <span className={styles.req}>*</span>}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows || 4}
          value={value || ''}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
          required={required}
        />
      ) : type === 'select' ? (
        <select id={id} name={name} value={value || ''} onChange={onChange} className={styles.input} required={required}>
          <option value="">-- select --</option>
          {options?.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
