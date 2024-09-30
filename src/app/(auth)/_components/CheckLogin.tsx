'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/store';

export default function CheckLogin() {
  const router = useRouter();
  const { setLogout } = useStore((state) => ({
    setLogout: state.setLogout,
  }));

  const handleRedirect = () => {
    if (typeof window === 'undefined') return;

    const userAuth = window.localStorage.getItem('store');

    if (!userAuth) {
      setLogout();
      router.replace('/login');
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return null;
}
