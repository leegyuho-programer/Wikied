'use client';

import { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalArticles: number;
  articlesPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalArticles, articlesPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const [pageGroup, setPageGroup] = useState(Math.ceil(currentPage / 5));

  useEffect(() => {
    setPageGroup(Math.ceil(currentPage / 5));
  }, [currentPage]);

  const getPageNumbers = () => {
    const start = (pageGroup - 1) * 5 + 1;
    const end = Math.min(start + 4, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 1) {
      const newPage = (pageGroup - 2) * 5 + 1;
      onPageChange(newPage);
    }
  };

  const handleNextGroup = () => {
    if (pageGroup * 5 < totalPages) {
      const newPage = pageGroup * 5 + 1;
      onPageChange(newPage);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handlePrevGroup} disabled={pageGroup === 1}>
        &lt;&lt;
      </button>
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
      <button className={styles.button} onClick={handleNextGroup} disabled={pageGroup * 5 >= totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
