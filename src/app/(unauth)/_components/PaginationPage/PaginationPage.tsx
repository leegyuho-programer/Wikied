'use client';

import { useQuery } from '@tanstack/react-query';
import getArticlePagination from '@/api/article/getArticlesPagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import LineStrokeIcon from '@/components/SvgComponents/StrokeIcon/LineStroke';
import { GetArticleResponseType } from '@/types/article';
import { useCallback, useState, useMemo } from 'react';
import ArticleList from '../ArticleList/ArticleList';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationPage.module.css';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const articlesPerPage = 10;

  const fetchArticles = useCallback(async (page: number) => {
    const response = await getArticlePagination(page, articlesPerPage);
    return response;
  }, []);

  const { data, isPending, isPlaceholderData } = useQuery<GetArticleResponseType>({
    queryKey: ['articles', currentPage],
    queryFn: () => fetchArticles(currentPage),
    placeholderData: (previousData) => previousData,
  });

  const sortArticles = useCallback((articlesToSort: GetArticleResponseType['list'], option: string) => {
    return articlesToSort.slice().sort((a, b) => {
      if (option === '최신순') {
        return b.id - a.id;
      } else if (option === '인기순') {
        return b.likeCount - a.likeCount;
      }
      return 0;
    });
  }, []);

  const filterArticles = useCallback((articlesToFilter: GetArticleResponseType['list'], term: string) => {
    if (!term) return articlesToFilter;
    return articlesToFilter.filter((article) => article.title.includes(term));
  }, []);

  const filteredArticles = useMemo(() => {
    if (!data) return [];
    return sortArticles(filterArticles(data.list, searchTerm), sortOption);
  }, [data, searchTerm, sortOption, sortArticles, filterArticles]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const pageCount = data ? Math.ceil(data.totalCount / articlesPerPage) : 0;

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
        totalArticles={data ? data.totalCount : 0}
        articlesPerPage={articlesPerPage}
        onPageChange={handlePageChange}
        isPlaceholderData={isPlaceholderData}
        isPending={isPending}
      />
    </div>
  );
}
