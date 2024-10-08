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

  const { data, isPending, isPlaceholderData } = useQuery<GetArticleResponseType>({
    queryKey: ['articles'],
    queryFn: () => getArticlePagination(1, 1000),
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
    const sortedArticles = sortArticles(filterArticles(data.list, searchTerm), sortOption);
    return sortedArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage); // 현재 페이지에 맞는 데이터만 선택
  }, [data, searchTerm, sortOption, currentPage, sortArticles, filterArticles]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar onSearch={setSearchTerm} className={styles.searchBar} />
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
