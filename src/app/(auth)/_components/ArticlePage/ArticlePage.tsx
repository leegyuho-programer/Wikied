import { getArticleServer } from '@/api/article/server-article';
import ArticlePageClient from '../ArticlePageClient/ArticlePageClient';

interface Props {
  articleId: number;
}

export default async function ArticlePage({ articleId }: Props) {
  try {
    const initialArticleData = await getArticleServer(articleId);
    return <ArticlePageClient initialData={initialArticleData} articleId={articleId} />;
  } catch (error) {
    console.error('서버에서 게시물 데이터 페칭에 실패했습니다.:', error);
    return <ArticlePageClient initialData={null} articleId={articleId} hasError={true} />;
  }
}
