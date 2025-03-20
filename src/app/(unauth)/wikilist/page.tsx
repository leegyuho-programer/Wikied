import { metadataMap } from '@/app/metadata';
import WikiListPage from '../_components/WikiListPage/WikiListPage';

export async function generateMetadata() {
  return metadataMap.wikiListPage;
}

export default function WikiList() {
  return <WikiListPage />;
}
