// In dev, Vite proxies /api -> backend:5006 (see vite.config.js).
// In production, set VITE_API_BASE to the backend's /api URL if it's not same-origin.
const BASE = (import.meta.env.VITE_API_BASE || '/api').replace(/\/$/, '');

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders(json = true) {
  return {
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    Authorization: `Bearer ${getToken()}`
  };
}

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(),
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin';
    return;
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Upload a File object to the backend (Cloudinary). Returns { url, public_id }.
async function uploadImage(file) {
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: authHeaders(false), // let the browser set multipart boundary
    body: fd
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data;
}

// Trigger a CSV download for an authed endpoint.
async function download(path, filename) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders(false) });
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),
  me: () => req('GET', '/auth/me'),

  // States
  getStates: () => req('GET', '/states?limit=100'),
  updateState: (id, data) => req('PUT', `/states/${id}`, data),

  // Cities
  getCities: (params = '') => req('GET', `/cities?limit=200${params}`),
  createCity: (data) => req('POST', '/cities', data),
  updateCity: (id, data) => req('PUT', `/cities/${id}`, data),
  deleteCity: (id) => req('DELETE', `/cities/${id}`),

  // Attractions
  getAttractions: (params = '') => req('GET', `/attractions?limit=200${params}`),
  createAttraction: (data) => req('POST', '/attractions', data),
  updateAttraction: (id, data) => req('PUT', `/attractions/${id}`, data),
  deleteAttraction: (id) => req('DELETE', `/attractions/${id}`),

  // Activities
  getActivities: (params = '') => req('GET', `/activities?limit=200${params}`),
  createActivity: (data) => req('POST', '/activities', data),
  updateActivity: (id, data) => req('PUT', `/activities/${id}`, data),
  deleteActivity: (id) => req('DELETE', `/activities/${id}`),

  // Itineraries
  getItineraries: () => req('GET', '/itineraries?limit=100'),
  createItinerary: (data) => req('POST', '/itineraries', data),
  updateItinerary: (id, data) => req('PUT', `/itineraries/${id}`, data),
  deleteItinerary: (id) => req('DELETE', `/itineraries/${id}`),

  // Leads (Bookings)
  getLeads: (params = '') => req('GET', `/leads?limit=200${params}`),
  updateLeadStatus: (id, status) => req('PUT', `/leads/${id}/status`, { status }),
  updateLead: (id, data) => req('PUT', `/leads/${id}`, data),
  deleteLead: (id) => req('DELETE', `/leads/${id}`),
  exportLeads: () => download('/leads/export', 'leads.csv'),

  // Reviews
  getReviews: (status = 'all') => req('GET', `/reviews?status=${status}`),
  approveReview: (id, is_approved) => req('PUT', `/reviews/${id}/approve`, { is_approved }),
  deleteReview: (id) => req('DELETE', `/reviews/${id}`),

  // Newsletter
  getSubscribers: () => req('GET', '/newsletter/subscribers'),
  deleteSubscriber: (id) => req('DELETE', `/newsletter/${id}`),
  exportSubscribers: () => download('/newsletter/export', 'subscribers.csv'),

  // Media library
  getMedia: () => req('GET', '/upload/media'),
  deleteMedia: (id) => req('DELETE', `/upload/media/${id}`),
  uploadImage,

  // Dashboard
  getStats: () => req('GET', '/admin/stats'),
};
