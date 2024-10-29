'use client';

import getArticlePagination from '@/api/article/getArticlesPagination';
import LinkButton from '@/components/Button/LinkButton';
import { GetArticleResponseType } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import PaginationPage from '../PaginationPage/PaginationPage';
import styles from './FreeBoardPage.module.css';
import FreeBoardPageSkeleton from './FreeBoardPageSkeleton';

export default function FreeBoardPage() {
  const [scrollX, setScrollX] = useState(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const {
    data: articles,
    isPending,
    error,
  } = useQuery<GetArticleResponseType>({
    queryKey: ['bestArticles'],
    queryFn: async () => {
      const response = await getArticlePagination(1, 10, 'like');
      return response;
    },
  });

  // 스크롤 가능 여부 체크
  useEffect(() => {
    const checkScroll = () => {
      if (cardWrapperRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = cardWrapperRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const currentRef = cardWrapperRef.current;
    const observer = new ResizeObserver(checkScroll);

    if (currentRef) {
      observer.observe(currentRef);
      checkScroll(); // 초기 체크
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [articles]);

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

  const handleScroll = () => {
    if (cardWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardWrapperRef.current;
      setScrollX(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 약간의 여유 추가
    }
  };

  if (error) {
    return <div className={styles.error}>게시글을 불러오는데 실패했습니다.</div>;
  }

  if (isPending) {
    return <FreeBoardPageSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <LinkButton variant="primary" destination="/posting" classname={styles.button}>
          게시물 등록하기
        </LinkButton>
      </div>
      <div className={styles.cardWrapper}>
        <button
          className={`${styles.scrollButton} ${styles.leftButton} ${!canScrollLeft ? styles.hidden : ''}`}
          onClick={scrollLeft}
          aria-label="스크롤 왼쪽"
        >
          {'<'}
        </button>

        <div className={styles.card} ref={cardWrapperRef} onScroll={handleScroll}>
          {articles?.list?.map((article) => (
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

        <button
          className={`${styles.scrollButton} ${styles.rightButton} ${!canScrollRight ? styles.hidden : ''}`}
          onClick={scrollRight}
          aria-label="스크롤 오른쪽"
        >
          {'>'}
        </button>
      </div>
      <PaginationPage />
    </div>
  );
}
