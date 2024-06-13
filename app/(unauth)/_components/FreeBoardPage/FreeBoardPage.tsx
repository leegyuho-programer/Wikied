// 'use client';

// import { useEffect, useState } from 'react';
// import Button from '../../../../components/Button/Button';
// import SearchBar from '../../../../components/SearchBar/SearchBar';
// import Card from '../Card/Card';
// import Filter from '../Filter/Filter';
// import Pagination from '../Pagination/Pagination';
// import styles from './FreeBoardPage.module.css';
// import { GetArticleResponseType } from '../../../../types/article';
// import getArticle from '../../../../api/article/getArticles';
// import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';

// export default function FreeBoardPage() {
//   const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);

//   useEffect(() => {
//     async function fetchArticles() {
//       try {
//         const response = await getArticle();
//         console.log(response);
//         setArticles(response.list);
//       } catch (error) {
//         console.error('Failed to fetch articles:', error);
//       }
//     }

//     fetchArticles();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>베스트 게시글</h1>
//         <Button variant="primary" isLink={true} destination="/posting" size="M">
//           게시물 등록하기
//         </Button>
//       </div>
//       <div className={styles.card}>
//         {articles.slice(0, 4).map((article) => (
//           <Card
//             key={article.id}
//             title={article.title}
//             image={article.image}
//             writerName={article.writer.name}
//             createdAt={article.createdAt}
//             likeCount={article.likeCount}
//           />
//         ))}
//       </div>
//       <div className={styles.body}>
//         <div className={styles.search}>
//           <SearchBar />
//           <Button variant="primary" isLink={false} size="XS">
//             검색
//           </Button>
//           <Filter />
//         </div>
//         <div>
//           내용들
//         </div>
//       </div>
//       <Pagination />
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import styles from './FreeBoardPage.module.css';
import { GetArticleResponseType } from '../../../../types/article';
import getArticle from '../../../../api/article/getArticles';
import ArticleList from '../ArticleList/ArticleList';
import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';

export default function FreeBoardPage() {
  const [articles, setArticles] = useState<GetArticleResponseType['list']>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticle();
        console.log(response);
        setArticles(response.list);
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
            title={article.title}
            image={article.image}
            writerName={article.writer.name}
            createdAt={article.createdAt}
            likeCount={article.likeCount}
          />
        ))}
      </div>
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
      <Pagination />
    </div>
  );
}
