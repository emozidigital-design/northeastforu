import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.login(form.email, form.password);
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
        navigate('/dashboard');
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.dot}></span>
          <span>NorthEastForU</span>
        </div>
        <h1 className={styles.title}>Admin Sign In</h1>
        <p className={styles.sub}>Manage your travel platform</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="admin@northeastforu.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className={styles.hint}>Default: admin@northeastforu.com / admin123</p>
      </div>
    </div>
  );
}
