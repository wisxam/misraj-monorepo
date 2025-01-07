import { useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';
import { getTokenFromLocalStorage } from '../store/auth/authUtils';
import { fetchUserProfile } from '../utils/api';

export const useUserProfile = () => {
  const { userProfile, setUserProfile } = useAuthStore();

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      return;
    }

    const fetchAndSetUserProfile = async () => {
      try {
        const data = await fetchUserProfile(token);
        setUserProfile(data);
      } catch (error) {
        throw error;
      }
    };

    fetchAndSetUserProfile();
  }, [setUserProfile]);

  return userProfile;
};
