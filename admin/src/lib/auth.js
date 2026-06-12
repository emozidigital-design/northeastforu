export const isLoggedIn = () => !!localStorage.getItem('admin_token');

export const setSession = (token, user) => {
  localStorage.setItem('admin_token', token);
  if (user) localStorage.setItem('admin_user', JSON.stringify(user));
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('admin_user') || 'null');
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
  window.location.href = '/';
};
