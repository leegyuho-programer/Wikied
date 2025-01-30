'use client';

import getArticlePagination from '@/api/article/getArticlesPagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import { StrokeIcon } from '@/components/SvgComponents';
import { GetArticleResponseType } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ArticleList from '../ArticleList/ArticleList';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationPage.module.css';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<'recent' | 'like'>('recent');
  const [keyword, setKeyword] = useState('');
  const pageSize = 10;

  const { data, isPending, isPlaceholderData } = useQuery<GetArticleResponseType>({
    queryKey: ['articles', currentPage, pageSize, sortOption, keyword],
    queryFn: () => getArticlePagination(currentPage, pageSize, sortOption, keyword),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option === '최신순' ? 'recent' : 'like');
  };

  const handleSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar onSearch={handleSearch} className={styles.searchBar} />
          <Filter onSortChange={handleSortChange} />
        </div>
        <div className={styles.articleList}>
          <StrokeIcon margin="15px 0" />
          <div className={styles.top}>
            <p className={styles.id}>번호</p>
            <p className={styles.articleTitle}>제목</p>
            <p className={styles.articleWriter}>작성자</p>
            <p className={styles.like}>좋아요</p>
            <p className={styles.day}>날짜</p>
          </div>
          <StrokeIcon margin="15px 0" />
          {data?.list.map((article) => (
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
        totalArticles={data?.totalCount || 0}
        articlesPerPage={pageSize}
        onPageChange={handlePageChange}
        isPlaceholderData={isPlaceholderData}
        isPending={isPending}
      />
    </div>
  );
}
