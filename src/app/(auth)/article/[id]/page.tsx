import { Suspense } from 'react';
import { generateArticleMetadata } from '@/app/metadataGenerators';
import ArticlePage from '../../_components/ArticlePage/ArticlePage';
import ArticlePageSkeleton from '../../_components/ArticlePage/ArticlePageSkeleton';
import CommentSection from '@/app/(unauth)/_components/Comment/CommentSection';
import CommentContainerSkeleton from '@/app/(unauth)/_components/Comment/CommentContainerSkeleton';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = generateArticleMetadata;

export default function Page({ params }: Props) {
  const articleId = Number(params.id);

  return (
    <div>
      <Suspense fallback={<ArticlePageSkeleton />}>
        <ArticlePage articleId={articleId} />
      </Suspense>

      <Suspense fallback={<CommentContainerSkeleton />}>
        <CommentSection articleId={articleId} />
      </Suspense>
    </div>
  );
}
