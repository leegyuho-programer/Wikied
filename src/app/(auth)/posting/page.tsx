import { metadataMap } from '@/app/metadata';
import PostingPage from '../_components/PostingPage/PostingPage';

export async function generateMetadata() {
  return metadataMap.postingPage;
}

export default function posting() {
  return <PostingPage />;
}
