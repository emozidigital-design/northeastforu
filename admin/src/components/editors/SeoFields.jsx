import FormField from '../FormField';
import styles from './Editors.module.css';

// Reusable seo_title + seo_description pair. `data` is the form object,
// `onChange` is the standard form change handler (e.target.name/value).
export default function SeoFields({ data, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>SEO</label>
      <FormField
        label="SEO Title"
        name="seo_title"
        value={data.seo_title}
        onChange={onChange}
        placeholder="Shown in search results & browser tab"
      />
      <FormField
        label="SEO Description"
        name="seo_description"
        type="textarea"
        rows={2}
        value={data.seo_description}
        onChange={onChange}
        placeholder="~155 characters meta description"
      />
    </div>
  );
}
