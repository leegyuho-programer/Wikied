'use client';

import getArticlePagination from '@/api/article/getArticlesPagination';
import LinkButton from '@/components/Button/LinkButton.';
import { GetArticleResponseType } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Card from '../Card/Card';
import PaginationPage from '../PaginationPage/PaginationPage';
import styles from './FreeBoardPage.module.css';
import FreeBoardPageSkeleton from './FreeBoardPageSkeleton';

export default function FreeBoardPage() {
  const [scrollX, setScrollX] = useState(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const {
    data: articles,
    isPending,
    error,
  } = useQuery<GetArticleResponseType, Error>({
    queryKey: ['getArticles'],
    queryFn: async () => {
      const response = await getArticlePagination(1, 1000);
      return response; // 전체 게시물 반환
    },
  });

  // 좋아요 수에 따라 전체 데이터 정렬
  const sortedArticles = articles?.list.sort((a, b) => b.likeCount - a.likeCount); // articles.list가 필요할 경우

  const scrollLeft = () => {
    if (cardWrapperRef.current) {
      const newX = Math.max(scrollX - 250, 0);
      cardWrapperRef.current.scrollTo({ left: newX, behavior: 'smooth' });
      setScrollX(newX);
    }
  };

  const scrollRight = () => {
    if (cardWrapperRef.current) {
      const maxScrollX = cardWrapperRef.current.scrollWidth - cardWrapperRef.current.clientWidth;
      const newX = Math.min(scrollX + 250, maxScrollX);
      cardWrapperRef.current.scrollTo({ left: newX, behavior: 'smooth' });
      setScrollX(newX);
    }
  };

  if (isPending) return <FreeBoardPageSkeleton />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <LinkButton variant="primary" destination="/posting" classname={styles.button}>
          게시물 등록하기
        </LinkButton>
      </div>
      <div className={styles.cardWrapper}>
        <button className={styles.scrollButton} onClick={scrollLeft}>
          {'<'}
        </button>
        <div className={styles.card} ref={cardWrapperRef}>
          {sortedArticles?.map((article) => (
            <Card
              key={article.id}
              id={article.id}
              title={article.title}
              image={article.image}
              writerName={article.writer.name}
              createdAt={article.createdAt}
              likeCount={article.likeCount}
            />
          ))}
        </div>
        <button className={styles.scrollButton} onClick={scrollRight}>
          {'>'}
        </button>
      </div>
      <PaginationPage />
    </div>
  );
}
