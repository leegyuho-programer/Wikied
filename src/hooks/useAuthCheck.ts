'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useStore } from '@/store';
import { parseCookies } from 'nookies';

export function useAuthCheck() {
  const router = useRouter();
  const { setLogout } = useStore((state) => ({
    setLogout: state.setLogout,
  }));

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return; // 서버 사이드에서 실행되지 않도록 체크

    const userAuth = window.localStorage.getItem('store');
    const cookies = parseCookies();
    const refreshToken = cookies.userRefreshToken;

    if (!userAuth || !refreshToken) {
      setLogout();
      router.replace('/login');
    }
  }, [router, setLogout]);
}
