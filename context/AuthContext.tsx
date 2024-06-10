'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: {
    id: number;
    code: string;
  };
}
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  password: string | null;
  login: (accessToken: string, refreshToken: string, user: User, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const router = useRouter();

  const login = (accessToken: string, refreshToken: string, user: User, password: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setPassword(password);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('password', password);
    router.replace('/mypage');
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('password');
    router.replace('/');
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedPassword = localStorage.getItem('password');
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setPassword(storedPassword);
      // 여기서 토큰을 사용하여 사용자 정보를 가져오는 API 호출 등을 할 수 있습니다.
      const storedUser: User = {
        id: 123,
        email: 'example@email.com',
        name: 'example',
        teamId: 'teamId',
        updatedAt: '2024-04-15T09:06:31.406Z',
        createdAt: '2024-04-15T09:06:31.406Z',
        profile: {
          id: 321,
          code: 'code',
        },
      };
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
