import ArticlePage from '@/app/(auth)/_components/ArticlePage/ArticlePage';
import { generateArticleMetadata } from '@/app/metadataGenerators';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = generateArticleMetadata;

export default function Page({ params }: Props) {
  return <ArticlePage params={params} />;
}
