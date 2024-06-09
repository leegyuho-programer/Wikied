import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!cookies().get('token'));
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!cookies().get('token'));
  }, []);

  const login = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=${1 * 24 * 60 * 60}`; // 1일 동안 쿠키 저장
    setIsLoggedIn(true);
    router.replace('/mypage');
  };

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0'; // 쿠키 삭제
    setIsLoggedIn(false);
    router.replace('/');
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
