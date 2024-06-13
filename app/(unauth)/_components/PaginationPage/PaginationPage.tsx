import { useState, useMemo, useCallback, useEffect } from 'react';
import { GetArticleResponseType } from '../../../../types/article';
import Button from '../../../../components/Button/Button';
import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';
import ArticleList from '../ArticleList/ArticleList';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationPage.module.css';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import getArticle from '../../../../api/article/getArticles';
import getArticlePagination from '../../../../api/article/getArticlesPagination';

interface PaginationPageProps {
  articles: GetArticleResponseType['list'];
}

export default function PaginationPage() {
  const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 10;
  const pageCount = Math.ceil(totalArticles / articlesPerPage); // 한 번에 표시할 페이지 번호의 수

  const fetchArticles = async (page: number) => {
    try {
      const response = await getArticlePagination(page, articlesPerPage);
      setArticles(response.list);
      setTotalArticles(response.totalCount);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  // // 최신순으로 정렬
  // const sortedArticles = useMemo(() => {
  //   return [...articles].sort((a, b) => b.id - a.id);
  // }, [articles]);

  // const handlePageChange = useCallback((pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // }, []);

  // const currentArticles = useMemo(() => {
  //   const indexOfLastArticle = currentPage * articlesPerPage;
  //   const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  //   return sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  // }, [sortedArticles, currentPage]);
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar />
          <Button variant="primary" isLink={false} size="XS">
            검색
          </Button>
          <Filter />
        </div>
        <div className={styles.articleList}>
          <LineStrokeIcon />
          <div className={styles.top}>
            <p className={styles.id}>번호</p>
            <p className={styles.articleTitle}>제목</p>
            <p className={styles.articleWriter}>작성자</p>
            <p className={styles.like}>좋아요</p>
            <p className={styles.day}>날짜</p>
          </div>
          <LineStrokeIcon />
          {articles.map((article) => (
            <ArticleList
              key={article.id}
              id={article.id}
              title={article.title}
              writerName={article.writer.name}
              createdAt={article.createdAt}
              likeCount={article.likeCount}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalArticles={totalArticles}
        articlesPerPage={articlesPerPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
