'use client';

import { useAuthCheck } from '@/hooks/useAuthCheck';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  useAuthCheck();
  return <>{children}</>;
}
