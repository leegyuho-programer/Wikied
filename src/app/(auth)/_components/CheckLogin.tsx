'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/store';

export default function CheckLogin() {
  const router = useRouter();
  const isLogin = useStore((state) => state.isLogin);

  const handleRedirect = () => {
    if (typeof window === 'undefined') return;

    const userAuth = window.localStorage.getItem('store');

    if (!userAuth || !isLogin) {
      router.replace('/login');
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [isLogin]);

  return null;
}
