import { useUserProfile } from '../hooks/useUserProfile';
import { useAuthStore } from '../store/auth/authStore';
import { Button } from '@mui/material';

const LoginButton = () => {
  const user = useUserProfile();
  const { token, logout } = useAuthStore();

  if (!user.userId && !token) {
    return <Button href="/login">Login</Button>;
  }
  return <Button onClick={logout}>Logout</Button>;
};

export default LoginButton;
