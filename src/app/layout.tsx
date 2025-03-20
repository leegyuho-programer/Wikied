import ReactQueryProviders from '@/utils/ReactQueryProvider';
import NavBar from '../components/NavBar/NavBar';
import '../styles/globals.css';
import { metadataMap } from './metadata';

export const metadata = metadataMap.default;

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
