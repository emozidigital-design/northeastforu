import { Plus, Trash2, Star } from 'lucide-react';
import styles from './Editors.module.css';
import local from './PricingTiersField.module.css';

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try { const p = JSON.parse(value); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
}

const emptyTier = () => ({ name: '', description: '', price: '', features: [], isPopular: false });

export default function PricingTiersField({ value, onChange }) {
  const tiers = toArray(value);

  const update = (next) => onChange(next);
  const setTier = (i, patch) => update(tiers.map((t, idx) => idx === i ? { ...t, ...patch } : t));
  const addTier = () => update([...tiers, emptyTier()]);
  const removeTier = (i) => update(tiers.filter((_, idx) => idx !== i));
  const setPopular = (i) => update(tiers.map((t, idx) => ({ ...t, isPopular: idx === i })));

  function setFeature(tierIdx, featIdx, val) {
    const features = [...(tiers[tierIdx].features || [])];
    features[featIdx] = val;
    setTier(tierIdx, { features });
  }
  function addFeature(tierIdx) {
    setTier(tierIdx, { features: [...(tiers[tierIdx].features || []), ''] });
  }
  function removeFeature(tierIdx, featIdx) {
    setTier(tierIdx, { features: (tiers[tierIdx].features || []).filter((_, i) => i !== featIdx) });
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>Pricing Tiers</label>
      <div className={local.tierGrid}>
        {tiers.map((tier, i) => (
          <div key={i} className={`${local.tierCard} ${tier.isPopular ? local.popular : ''}`}>
            {tier.isPopular && <span className={local.popularBadge}>Recommended</span>}
            <div className={local.tierTop}>
              <div className={styles.field}>
                <label className={styles.label}>Tier Name</label>
                <input className={styles.input} value={tier.name} placeholder="e.g. Deluxe"
                  onChange={e => setTier(i, { name: e.target.value })} />
              </div>
              <button type="button" className={`${local.starBtn} ${tier.isPopular ? local.starBtnOn : ''}`}
                onClick={() => setPopular(i)} title="Mark as recommended">
                <Star size={14} fill={tier.isPopular ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Subtitle</label>
              <input className={styles.input} value={tier.description} placeholder="e.g. Premium Comfort"
                onChange={e => setTier(i, { description: e.target.value })} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Price per pax (₹)</label>
              <input className={styles.input} type="number" value={tier.price} placeholder="47000"
                onChange={e => setTier(i, { price: e.target.value })} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Features</label>
              {(tier.features || []).map((feat, fi) => (
                <div className={styles.listRow} key={fi}>
                  <input className={styles.input} value={feat} placeholder="Feature"
                    onChange={e => setFeature(i, fi, e.target.value)} />
                  <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} onClick={() => removeFeature(i, fi)}><Trash2 size={13} /></button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => addFeature(i)}><Plus size={13} /> Add Feature</button>
            </div>

            <button type="button" className={local.removeBtn} onClick={() => removeTier(i)}>
              <Trash2 size={13} /> Remove Tier
            </button>
          </div>
        ))}
      </div>
      {tiers.length < 4 && (
        <button type="button" className={styles.addBtn} onClick={addTier}><Plus size={14} /> Add Pricing Tier</button>
      )}
    </div>
  );
}
