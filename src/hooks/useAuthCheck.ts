'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/store';
import { parseCookies } from 'nookies';

export function useAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();
  const { setLogout } = useStore((state) => ({
    setLogout: state.setLogout,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return; // 서버 사이드에서 실행되지 않도록 체크

    const userAuth = window.localStorage.getItem('store');
    const cookies = parseCookies();
    const refreshToken = cookies.userRefreshToken;

    // if (!userAuth || !refreshToken) {
    //   setLogout();
    //   router.replace('/login');
    // }
    // 현재 경로가 /login이 아닐 때만 리다이렉션 체크
    if (!userAuth || !refreshToken) {
      if (pathname !== '/login') {
        setLogout();
        router.replace(`/login?redirect_to=${encodeURIComponent(pathname)}`);
      }
    }
  }, [router, setLogout]);
}
