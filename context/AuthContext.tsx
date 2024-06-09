'use client';

import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    router.replace('/mypage');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    router.replace('/');
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
