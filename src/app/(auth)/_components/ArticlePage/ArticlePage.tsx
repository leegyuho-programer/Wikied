import { getArticleServer } from '@/api/article/server-article';
import ArticlePageClient from '../ArticlePageClient/ArticlePageClient';

interface Props {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: Props) {
  const articleId = Number(params.id);

  try {
    const initialArticleData = await getArticleServer(articleId);

    return <ArticlePageClient initialData={initialArticleData} articleId={articleId} />;
  } catch (error) {
    console.error('서버에서 데이터 페칭에 실패했습니다.:', error);

    return <ArticlePageClient initialData={null} articleId={articleId} hasError={true} />;
  }
}
