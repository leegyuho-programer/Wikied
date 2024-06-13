// import { useState, useMemo, useCallback, useEffect } from 'react';
// import { GetArticleResponseType } from '../../../../types/article';
// import Button from '../../../../components/Button/Button';
// import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';
// import ArticleList from '../ArticleList/ArticleList';
// import Pagination from '../Pagination/Pagination';
// import styles from './PaginationPage.module.css';
// import SearchBar from '../../../../components/SearchBar/SearchBar';
// import Filter from '../Filter/Filter';
// import getArticle from '../../../../api/article/getArticles';
// import getArticlePagination from '../../../../api/article/getArticlesPagination';

// interface PaginationPageProps {
//   articles: GetArticleResponseType['list'];
// }

// export default function PaginationPage() {
//   const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalArticles, setTotalArticles] = useState(0);
//   const [sortOption, setSortOption] = useState('최신순');
//   const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
//   const articlesPerPage = 10;
//   const pageCount = Math.ceil(totalArticles / articlesPerPage); // 한 번에 표시할 페이지 번호의 수

//   const fetchArticles = async (page: number) => {
//     try {
//       const response = await getArticlePagination(page, articlesPerPage);
//       setArticles(response.list);
//       setTotalArticles(response.totalCount);
//     } catch (error) {
//       console.error('Failed to fetch articles:', error);
//     }
//   };

//   useEffect(() => {
//     fetchArticles(currentPage);
//   }, [currentPage]);

//   // 정렬 기준에 따라 articles 배열을 정렬하는 함수
//   const sortArticles = useCallback(
//     (option: string) => {
//       if (option === '최신순') {
//         const sorted = [...articles].sort((a, b) => b.id - a.id);
//         setArticles(sorted);
//       } else if (option === '인기순') {
//         const sorted = [...articles].sort((a, b) => b.likeCount - a.likeCount);
//         setArticles(sorted);
//       }
//     },
//     [articles]
//   );

//   // 검색어를 사용하여 articles 배열을 필터링하는 함수
//   const filterArticles = useCallback(
//     (searchTerm: string) => {
//       setSearchTerm(searchTerm); // 검색어 상태 업데이트

//       if (searchTerm === '') {
//         setArticles(articles); // 검색어가 비어있으면 전체 articles로 설정
//       } else {
//         const filtered = articles.filter((article) => article.title.includes(searchTerm));
//         setArticles(filtered); // 검색어에 맞는 게시글만 필터링하여 설정
//       }
//     },
//     [articles]
//   );

//   const handlePageChange = useCallback((pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   }, []);

//   // 정렬 기준이 변경되면 articles를 다시 정렬
//   useEffect(() => {
//     sortArticles(sortOption);
//   }, [sortOption, sortArticles]);

//   // 검색어가 변경되면 articles를 필터링
//   useEffect(() => {
//     filterArticles(searchTerm);
//   }, [searchTerm, filterArticles]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.body}>
//         <div className={styles.search}>
//           <SearchBar onSearch={setSearchTerm} />
//           <Button variant="primary" isLink={false} size="XS">
//             검색
//           </Button>
//           <Filter onSortChange={setSortOption} />
//         </div>
//         <div className={styles.articleList}>
//           <LineStrokeIcon />
//           <div className={styles.top}>
//             <p className={styles.id}>번호</p>
//             <p className={styles.articleTitle}>제목</p>
//             <p className={styles.articleWriter}>작성자</p>
//             <p className={styles.like}>좋아요</p>
//             <p className={styles.day}>날짜</p>
//           </div>
//           <LineStrokeIcon />
//           {articles.map((article) => (
//             <ArticleList
//               key={article.id}
//               id={article.id}
//               title={article.title}
//               writerName={article.writer.name}
//               createdAt={article.createdAt}
//               likeCount={article.likeCount}
//             />
//           ))}
//         </div>
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalArticles={totalArticles}
//         articlesPerPage={articlesPerPage}
//         pageCount={pageCount}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { GetArticleResponseType } from '../../../../types/article';
import Button from '../../../../components/Button/Button';
import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';
import ArticleList from '../ArticleList/ArticleList';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationPage.module.css';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import getArticlePagination from '../../../../api/article/getArticlesPagination';

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
          <SearchBar onSearch={handleSearch} />
          {/* <Button variant="primary" isLink={false} size="XS">
            검색
          </Button> */}
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
