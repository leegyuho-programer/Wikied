'use client';

import { GetArticleResponseType } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import styles from '../FreeBoardPage/FreeBoardPage.module.css';
import getArticlePagination from '@/api/article/getArticlesPagination';

interface Props {
  initialData: GetArticleResponseType;
}

export default function BestArticlesClient({ initialData }: Props) {
  const [scrollX, setScrollX] = useState(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { data: articles } = useQuery<GetArticleResponseType>({
    queryKey: ['bestArticles'],
    queryFn: async () => {
      const response = await getArticlePagination(1, 10, 'like');
      return response;
    },
    initialData, // 서버에서 가져온 초기 데이터 사용
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
      checkScroll();
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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
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
  );
}
