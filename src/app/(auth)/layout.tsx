import { ReactNode } from 'react';
import CheckLogin from './_components/CheckLogin';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <CheckLogin />
      {children}
    </>
  );
}
