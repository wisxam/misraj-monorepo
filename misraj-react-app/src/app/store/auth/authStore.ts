import { create } from 'zustand';
import { loginUser } from './authService';
import {
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from './authUtils';

interface AuthState {
  token: string | null;
  userProfile: { userId: number | null; email: string | null };
  setUserProfile: (profile: { userId: number; email: string }) => void;
  setToken: (token: string) => void;
  removeToken: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getTokenFromLocalStorage(),

  setToken: (token: string) => {
    saveTokenToLocalStorage(token);
    set({ token });
  },

  userProfile: { userId: null, email: null },

  setUserProfile: (profile) => set({ userProfile: profile }),

  removeToken: () => {
    removeTokenFromLocalStorage();
    set({ token: null });
  },

  login: async (email: string, password: string) => {
    const { token } = await loginUser(email, password);
    if (token) {
      saveTokenToLocalStorage(token);
      set({ token });
    } else {
      throw new Error('Login failed');
    }
  },

  logout: () => {
    removeTokenFromLocalStorage();

    set({
      token: null,
      userProfile: { userId: null, email: null },
    });
  },
}));
