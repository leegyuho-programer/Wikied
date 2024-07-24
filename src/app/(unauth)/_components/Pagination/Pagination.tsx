'use client';

import { useState } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalArticles: number; // 데이터의 총 개수
  articlesPerPage: number; // 페이지 당 보여줄 데이터 개수
  currentPage: number; // 현재 페이지
  pageCount: number; // 보여줄 페이지 개수 ex) 1-5페이지
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalArticles, articlesPerPage, pageCount, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalArticles / articlesPerPage); // 총 페이지 개수
  const [start, setStart] = useState(1); // 시작 페이지
  const end = Math.min(start + pageCount - 1, totalPages);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const pageNumbers = [];

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
