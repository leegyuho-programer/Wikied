'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import getArticle from '../../../../api/article/getArticle';
import Button from '../../../../components/Button/Button';
import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import { useStore } from '../../../../store';
import { GetArticleIdResponseType } from '../../../../types/article';
import styles from './ArticlePage.module.css';
import Link from 'next/link';
import CommentContainer from '../Comment/CommentContainer';

import deleteLike from '../../../../api/article/deleteLike';
import postLike from '../../../../api/article/postLike';

export default function ArticlePage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const setArticleId = useStore((state) => state.setArticleId);
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [article, setArticle] = useState<GetArticleIdResponseType | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태 관리

  useEffect(() => {
    console.log(id);
    if (id) {
      setArticleId(Number(id));
      async function fetchArticle() {
        try {
          const response = await getArticle(Number(id), accessToken);
          setArticle(response);
          setIsLiked(response.isLiked); // 초기 좋아요 상태 설정
        } catch (error) {
          console.error('게시글을 불러오는 데 실패했습니다:', error);
        }
      }
      fetchArticle();
    } else {
      console.log('게시글 ID가 정의되지 않았습니다.');
    }
  }, [id, accessToken, setArticleId]);

  const handleLikeClick = async () => {
    if (!article) return;

    try {
      if (!isLiked) {
        // 좋아요 추가
        await postLike(accessToken, Number(id)); // postLike 함수에 필요한 데이터 전달
        setArticle((prevArticle) => ({
          ...prevArticle!,
          likeCount: prevArticle!.likeCount + 1,
          isLiked: true,
        }));
      } else {
        // 좋아요 제거
        await deleteLike(article.id, accessToken); // deleteLike 함수에 게시글 ID 전달
        setArticle((prevArticle) => ({
          ...prevArticle!,
          likeCount: prevArticle!.likeCount - 1,
          isLiked: false,
        }));
      }
      setIsLiked(!isLiked); // 좋아요 상태 토글
    } catch (error) {
      console.error('좋아요 처리에 실패했습니다:', error);
    }
  };

  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            <Button variant="primary" isLink={true} destination={`/article/${id}/articleEdit`} size="S">
              수정하기
            </Button>
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <p>{article.writer.name}</p>
              <p>{new Date(article.createdAt).toLocaleDateString()}</p>
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
              <HeartIcon filled={isLiked} /> {/* filled prop으로 좋아요 여부 전달 */}
              <p>{article.likeCount}</p>
            </div>
          </div>
        </div>
        <ArticleStrokeIcon />
        <div>{article.content}</div>
      </div>
      <Link href="/freeBoard" className={styles.link}>
        목록으로
      </Link>
      <CommentContainer articleId={Number(id)} />
    </div>
  );
}
