import { metadataMap } from '@/app/metadata';
import ArticleEditPage from '../../_components/ArticleEditPage/ArticleEditPage';

export async function generateMetadata() {
  return metadataMap.articleEditPage;
}

export default function ArticleEdit() {
  return <ArticleEditPage />;
}
