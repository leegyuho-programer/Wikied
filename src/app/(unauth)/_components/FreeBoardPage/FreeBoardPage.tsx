import getArticlePagination from '@/api/article/getArticlesPagination';
import LinkButton from '@/components/Button/LinkButton';
import BestArticlesClient from '../BestArticlesClient/BestArticlesClient';
import PaginationPageClient from '../PaginationPageClient/PaginationPageClient';
import styles from './FreeBoardPage.module.css';

// ISR 설정
export const revalidate = 300; // 5분마다 재생성

export default async function FreeBoardPage() {
  // 서버에서 베스트 게시글 미리 가져오기
  const initialBestArticles = await getArticlePagination(1, 10, 'like');
  const initialArticles = await getArticlePagination(1, 10, 'recent');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <LinkButton variant="primary" destination="/posting" classname={styles.button}>
          게시물 등록하기
        </LinkButton>
      </div>

      {/* 베스트 게시글 섹션 - 클라이언트 컴포넌트로 분리 */}
      <BestArticlesClient initialData={initialBestArticles} />

      {/* 일반 게시글 목록 - 클라이언트 컴포넌트로 분리 */}
      <PaginationPageClient initialData={initialArticles} />
    </div>
  );
}
