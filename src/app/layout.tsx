import type { Metadata } from 'next';
import NavBar from '../components/NavBar/NavBar';
import '../styles/globals.css';
import ReactQueryProviders from '@/utils/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Wikied',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProviders>
          <NavBar />
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}
