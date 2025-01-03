import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};