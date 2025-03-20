import { metadataMap } from '@/app/metadata';
import MyPage from '../_components/MyPage/MyPage';

export async function generateMetadata() {
  return metadataMap.myPage;
}

export default function Home() {
  return <MyPage />;
}
