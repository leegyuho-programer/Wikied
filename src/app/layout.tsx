import type { Metadata } from 'next';
import NavBar from '../components/NavBar/NavBar';
import '../styles/globals.css';
import ReactQueryProviders from '@/utils/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Wikied - Your Custom Wiki',
  description: 'Create and edit custom wiki pages with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          <NavBar />
          <main>{children}</main>
          <div id="modal"></div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
