import styles from './Table.module.css';

export default function Table({ columns, data, loading, emptyMsg = 'No data found' }) {
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!data.length) return <div className={styles.empty}>{emptyMsg}</div>;

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
