'use client';

import { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

interface Props {
  totalArticles: number; // 전체 게시물(기사 등)의 개수
  articlesPerPage: number; // 한 페이지에 표시할 게시물 수
  currentPage: number; // 현재 선택된 페이지
  onPageChange: (pageNumber: number) => void; // 페이지 변경 시 호출될 함수
  isPlaceholderData: boolean;
  isPending: boolean;
}

const Pagination = ({
  currentPage,
  totalArticles,
  articlesPerPage,
  onPageChange,
  isPlaceholderData,
  isPending,
}: Props) => {
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const [pageGroup, setPageGroup] = useState(Math.ceil(currentPage / 5));

  useEffect(() => {
    setPageGroup(Math.ceil(currentPage / 5));
  }, [currentPage]);

  const getPageNumbers = () => {
    const start = (pageGroup - 1) * 5 + 1; // 페이지 그룹의 첫 번째 번호
    const end = Math.min(start + 4, totalPages); // 그룹에서 마지막 페이지 번호

    return Array.from({ length: end - start + 1 }, (_, i) => start + i); // 배열로 페이지 번호 리스트 반환
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && !isPending) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 1 && !isPending) {
      const newPage = (pageGroup - 2) * 5 + 1; // 이전 그룹의 첫 번째 페이지로 이동
      onPageChange(newPage);
    }
  };

  const handleNextGroup = () => {
    if (pageGroup * 5 < totalPages && !isPending) {
      const newPage = pageGroup * 5 + 1; // 다음 그룹의 첫 번째 페이지로 이동
      onPageChange(newPage);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handlePrevGroup}
        disabled={pageGroup === 1 || isPending || isPlaceholderData}
      >
        &lt;&lt;
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending || isPlaceholderData}
      >
        &lt;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${styles.button} ${number === currentPage ? styles.active : ''}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending || isPlaceholderData}
      >
        &gt;
      </button>
      <button
        className={styles.button}
        onClick={handleNextGroup}
        disabled={pageGroup * 5 >= totalPages || isPending || isPlaceholderData}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
