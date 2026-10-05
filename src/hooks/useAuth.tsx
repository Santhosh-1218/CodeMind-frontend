'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { UserProfile } from '@/types/auth';
import { fetchApi, clearApiCache } from '@/lib/api';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      clearApiCache();
      const data = await fetchApi<UserProfile>('/auth/me');
      setUser(data);
    } catch (e) {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('codemind_token');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        clearApiCache();
        localStorage.setItem('codemind_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    clearApiCache();
    const res = await fetchApi<{ token: string; user: UserProfile }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass })
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('codemind_token', res.token);
    }
    setUser(res.user);
  };

  const register = async (full_name: string, email: string, pass: string) => {
    clearApiCache();
    const res = await fetchApi<{ token: string; user: UserProfile }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ full_name, email, password: pass })
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('codemind_token', res.token);
    }
    setUser(res.user);
  };

  const logout = async () => {
    clearApiCache();
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('codemind_token');
    }
    setUser(null);
  };

  const contextValue = { user, loading, login, register, logout, refreshUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
