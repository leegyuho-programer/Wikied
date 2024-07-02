'use client';

import { getArticles } from '@/api/article/articles';
import Button from '@/components/Button/Button';
import { GetArticleResponseType } from '@/types/article';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import PaginationPage from '../PaginationPage/PaginationPage';
import styles from './FreeBoardPage.module.css';

export default function FreeBoardPage() {
  const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);
  const [scrollX, setScrollX] = useState(0);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticles();
        console.log(response);
        setArticles(response.list);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    }

    fetchArticles();
  }, []);

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <Button variant="primary" isLink={true} destination="/posting" classname={styles.button}>
          게시물 등록하기
        </Button>
      </div>
      <div className={styles.cardWrapper}>
        <button className={styles.scrollButton} onClick={scrollLeft}>
          {'<'}
        </button>
        <div className={styles.card} ref={cardWrapperRef}>
          {articles
            .sort((a, b) => b.likeCount - a.likeCount)
            .map((article) => (
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
