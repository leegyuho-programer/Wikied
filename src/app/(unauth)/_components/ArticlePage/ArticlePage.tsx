'use client';

import { deleteArticle, getArticle } from '@/api/article/article';
import { deleteLike, postLike } from '@/api/article/like';
import Button from '@/components/Button/Button';
import HeartIcon from '@/components/SvgComponents/HeartIcon/HeartIcon';
import ArticleStrokeIcon from '@/components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import { useStore } from '@/store';
import { GetArticleIdResponseType } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CommentContainer from '../Comment/CommentContainer';
import styles from './ArticlePage.module.css';

export default function ArticlePage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const user = useStore((state) => state.user);
  const setArticleId = useStore((state) => state.setArticleId);
  const pathname = usePathname();
  const id = Number(pathname.split('/').pop());
  const [article, setArticle] = useState<GetArticleIdResponseType | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태 관리
  const router = useRouter();

  const handleLikeClick = async () => {
    if (!article) return;

    try {
      if (!isLiked) {
        // 좋아요 추가
        await postLike(accessToken, id);
        setArticle((prevArticle) =>
          prevArticle ? { ...prevArticle, likeCount: prevArticle.likeCount + 1, isLiked: true } : null
        );
      } else {
        // 좋아요 제거
        await deleteLike(article.id, accessToken);
        setArticle((prevArticle) =>
          prevArticle ? { ...prevArticle, likeCount: prevArticle.likeCount - 1, isLiked: false } : null
        );
      }
      setIsLiked(!isLiked); // 좋아요 상태 토글
    } catch (error) {
      console.error('좋아요 처리에 실패했습니다:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (!article) return;

    try {
      await deleteArticle(article.id, accessToken);
      alert('게시물이 성공적으로 삭제되었습니다.');
      router.push('/freeBoard');
    } catch (error) {
      console.error('게시물 삭제에 실패했습니다:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  };

  const fetchArticle = useCallback(async () => {
    try {
      const response = await getArticle(id, accessToken);
      setArticle(response);
      setIsLiked(response.isLiked);
    } catch (error) {
      console.error('게시글을 불러오는 데 실패했습니다:', error);
    }
  }, [id, accessToken]);

  useEffect(() => {
    if (id) {
      setArticleId(id);
      fetchArticle();
    } else {
      console.log('게시글 ID가 정의되지 않았습니다.');
    }
  }, [id, setArticleId, fetchArticle]);

  if (!article) {
    return (
      <div className={styles.wrapperContainer}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.</p>
          <Button variant="primary" onClick={fetchArticle} isLink={false} size="S">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            {article.writer.name === user?.name && (
              <div className={styles.buttons}>
                <Button variant="primary" isLink={true} destination={`/article/${id}/articleEdit`} size="S">
                  수정하기
                </Button>
                <Button variant="secondary" isLink={false} onClick={handleDeleteClick} size="S">
                  삭제하기
                </Button>
              </div>
            )}
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
        <div className={styles.imageWrapper}>
          <Image src={article.image} alt="대표 이미지" layout="fill" className={styles.image} />
        </div>
        <div>{article.content}</div>
      </div>
      <Link href="/freeBoard" className={styles.link}>
        목록으로
      </Link>
      <CommentContainer articleId={id} />
    </div>
  );
}
