'use client';

import { useCallback, useEffect, useState } from 'react';
import getArticlePagination from '../../../../api/article/getArticlesPagination';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';
import { GetArticleResponseType } from '../../../../types/article';
import ArticleList from '../ArticleList/ArticleList';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationPage.module.css';

interface PaginationPageProps {
  articles: GetArticleResponseType['list'];
}

export default function PaginationPage() {
  const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);
  const [filteredArticles, setFilteredArticles] = useState<GetArticleResponseType['list']>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const articlesPerPage = 10;
  const pageCount = Math.ceil(totalArticles / articlesPerPage);

  const fetchArticles = async (page: number) => {
    try {
      const response = await getArticlePagination(page, articlesPerPage);
      setArticles(response.list);
      setTotalArticles(response.totalCount);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  const sortArticles = useCallback((articlesToSort: GetArticleResponseType['list'], option: string) => {
    if (option === '최신순') {
      return [...articlesToSort].sort((a, b) => b.id - a.id);
    } else if (option === '인기순') {
      return [...articlesToSort].sort((a, b) => b.likeCount - a.likeCount);
    }
    return articlesToSort;
  }, []);

  const filterArticles = useCallback((articlesToFilter: GetArticleResponseType['list'], searchTerm: string) => {
    if (!searchTerm) {
      return articlesToFilter;
    }
    return articlesToFilter.filter((article) => article.title.includes(searchTerm));
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let updatedArticles = articles;

    updatedArticles = filterArticles(updatedArticles, searchTerm);
    updatedArticles = sortArticles(updatedArticles, sortOption);

    setFilteredArticles(updatedArticles);
  }, [articles, searchTerm, sortOption, filterArticles, sortArticles]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar onSearch={handleSearch} className={styles.searchBar} />
          <Filter onSortChange={setSortOption} />
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
          {filteredArticles.map((article) => (
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
