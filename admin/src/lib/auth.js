export const isLoggedIn = () => !!localStorage.getItem('admin_token');

export const logout = () => {
  localStorage.removeItem('admin_token');
  window.location.href = '/';
};
