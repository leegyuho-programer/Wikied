'use client';

import { useEffect, useState } from 'react';
import getArticles from '../../../../api/article/getArticles';
import Button from '../../../../components/Button/Button';
import { GetArticleResponseType } from '../../../../types/article';
import Card from '../Card/Card';
import PaginationPage from '../PaginationPage/PaginationPage';
import styles from './FreeBoardPage.module.css';

export default function FreeBoardPage() {
  const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticles(); // getArticles 호출
        console.log(response);
        setArticles(response.list); // response.list를 설정
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <Button variant="primary" isLink={true} destination="/posting" size="M">
          게시물 등록하기
        </Button>
      </div>
      <div className={styles.card}>
        {articles.slice(0, 4).map((article) => (
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
      <PaginationPage />
    </div>
  );
}
