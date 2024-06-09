import type { Metadata } from 'next';
import '../styles/globals.css';
import NavBar from '../components/NavBar/NavBar';
import { AuthProvider } from '../context/AuthContext';

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
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
