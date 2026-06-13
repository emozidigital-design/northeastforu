import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Editors.module.css';
import local from './DailyScheduleField.module.css';

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try { const p = JSON.parse(value); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
}

const emptyDay = () => ({ title: '', description: '', activities: [], meals: [], stay: '' });

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Tea/Snacks'];

export default function DailyScheduleField({ value, onChange }) {
  const days = toArray(value);

  const update = (next) => onChange(next);
  const setDay = (i, patch) => {
    const n = days.map((d, idx) => idx === i ? { ...d, ...patch } : d);
    update(n);
  };
  const addDay = () => update([...days, emptyDay()]);
  const removeDay = (i) => update(days.filter((_, idx) => idx !== i));
  const moveUp = (i) => {
    if (i === 0) return;
    const n = [...days];
    [n[i - 1], n[i]] = [n[i], n[i - 1]];
    update(n);
  };
  const moveDown = (i) => {
    if (i === days.length - 1) return;
    const n = [...days];
    [n[i], n[i + 1]] = [n[i + 1], n[i]];
    update(n);
  };

  function setListItem(dayIdx, field, itemIdx, val) {
    const arr = [...(days[dayIdx][field] || [])];
    arr[itemIdx] = val;
    setDay(dayIdx, { [field]: arr });
  }
  function addListItem(dayIdx, field) {
    setDay(dayIdx, { [field]: [...(days[dayIdx][field] || []), ''] });
  }
  function removeListItem(dayIdx, field, itemIdx) {
    setDay(dayIdx, { [field]: (days[dayIdx][field] || []).filter((_, i) => i !== itemIdx) });
  }
  function toggleMeal(dayIdx, meal) {
    const meals = days[dayIdx].meals || [];
    const next = meals.includes(meal) ? meals.filter(m => m !== meal) : [...meals, meal];
    setDay(dayIdx, { meals: next });
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>Daily Itinerary Schedule</label>
      {days.map((day, i) => (
        <div key={i} className={local.dayCard}>
          <div className={local.dayHeader}>
            <span className={local.dayBadge}>Day {i + 1}</span>
            <div className={local.dayActions}>
              <button type="button" className={styles.iconBtn} onClick={() => moveUp(i)} disabled={i === 0} title="Move up"><ChevronUp size={14} /></button>
              <button type="button" className={styles.iconBtn} onClick={() => moveDown(i)} disabled={i === days.length - 1} title="Move down"><ChevronDown size={14} /></button>
              <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} onClick={() => removeDay(i)} title="Remove day"><Trash2 size={14} /></button>
            </div>
          </div>

          <div className={local.dayBody}>
            <div className={local.row2}>
              <div className={styles.field}>
                <label className={styles.label}>Day Title</label>
                <input className={styles.input} value={day.title} placeholder="e.g. Arrival & Local Sightseeing"
                  onChange={e => setDay(i, { title: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Night Stay</label>
                <input className={styles.input} value={day.stay} placeholder="e.g. Guwahati / Eco-Resort"
                  onChange={e => setDay(i, { stay: e.target.value })} />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea className={styles.input} rows={2} value={day.description} placeholder="Brief summary of the day"
                onChange={e => setDay(i, { description: e.target.value })} />
            </div>

            <div className={local.row2}>
              {/* Activities */}
              <div className={styles.field}>
                <label className={styles.label}>Activities</label>
                {(day.activities || []).map((act, ai) => (
                  <div className={styles.listRow} key={ai}>
                    <input className={styles.input} value={act} placeholder="Activity"
                      onChange={e => setListItem(i, 'activities', ai, e.target.value)} />
                    <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} onClick={() => removeListItem(i, 'activities', ai)}><Trash2 size={13} /></button>
                  </div>
                ))}
                <button type="button" className={styles.addBtn} onClick={() => addListItem(i, 'activities')}><Plus size={13} /> Add Activity</button>
              </div>

              {/* Meals */}
              <div className={styles.field}>
                <label className={styles.label}>Meals Included</label>
                <div className={local.mealRow}>
                  {MEAL_OPTIONS.map(meal => (
                    <button key={meal} type="button"
                      className={`${local.mealChip} ${(day.meals || []).includes(meal) ? local.mealChipOn : ''}`}
                      onClick={() => toggleMeal(i, meal)}>
                      {meal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addDay}><Plus size={14} /> Add Day</button>
    </div>
  );
}
