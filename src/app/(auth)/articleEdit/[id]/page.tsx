import { metadataMap } from '@/app/metadata';
import ArticleEditPage from '../../_components/ArticleEditPage/ArticleEditPage';

export async function generateMetadata() {
  return metadataMap.articleEdit;
}

export default function ArticleEdit() {
  return <ArticleEditPage />;
}
