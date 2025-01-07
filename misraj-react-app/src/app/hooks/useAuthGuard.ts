import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth/authStore';

const useAuthGuard = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location } });
    }
  }, [token, navigate, location]);
};

export default useAuthGuard;
