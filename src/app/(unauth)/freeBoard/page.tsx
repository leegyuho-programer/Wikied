import { metadataMap } from '@/app/metadata';
import FreeBoardPage from '../_components/FreeBoardPage/FreeBoardPage';

export async function generateMetadata() {
  return metadataMap.freeBoardPage;
}

export default function FreeBoard() {
  return <FreeBoardPage />;
}
