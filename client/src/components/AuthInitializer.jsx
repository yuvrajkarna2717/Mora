import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(loginSuccess({ token, user }));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    // Listen for logout events from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'logout') {
        dispatch(logout());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return children;
};

export default AuthInitializer;