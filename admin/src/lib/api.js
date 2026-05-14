const BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
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
    window.location.href = '/';
    return;
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),

  // States
  getStates: () => req('GET', '/states?limit=100'),
  updateState: (id, data) => req('PUT', `/states/${id}`, data),

  // Cities
  getCities: (params = '') => req('GET', `/cities?limit=100${params}`),
  createCity: (data) => req('POST', '/cities', data),
  updateCity: (id, data) => req('PUT', `/cities/${id}`, data),
  deleteCity: (id) => req('DELETE', `/cities/${id}`),

  // Blogs
  getBlogs: () => req('GET', '/blogs?limit=100'),
  createBlog: (data) => req('POST', '/blogs', data),
  updateBlog: (id, data) => req('PUT', `/blogs/${id}`, data),
  deleteBlog: (id) => req('DELETE', `/blogs/${id}`),

  // Itineraries
  getItineraries: () => req('GET', '/itineraries?limit=100'),
  createItinerary: (data) => req('POST', '/itineraries', data),

  // Leads (Bookings)
  getLeads: () => req('GET', '/leads?limit=200'),
  updateLeadStatus: (id, status) => req('PUT', `/leads/${id}/status`, { status }),
  deleteLead: (id) => req('DELETE', `/leads/${id}`),

  // Admin stats
  getAutomationStats: () => req('GET', '/admin/automation/stats'),
};
