'use client';

import { useAuthCheck } from '@/hooks/useAuthCheck';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const isChecking = useAuthCheck();

  if (isChecking) return null;

  return <>{children}</>;
}
