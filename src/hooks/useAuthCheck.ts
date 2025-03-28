import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { parseCookies } from 'nookies';

export function useAuthCheck() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const setLogout = useStore((state) => state.setLogout);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const userAuth = window.localStorage.getItem('store');
    const cookies = parseCookies();
    const refreshToken = cookies.userRefreshToken;

    if (!userAuth || !refreshToken) {
      alert('로그인이 필요합니다.');
      setLogout();
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [router, setLogout]);

  return isChecking;
}
