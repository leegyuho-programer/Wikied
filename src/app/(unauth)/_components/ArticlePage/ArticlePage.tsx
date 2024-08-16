'use client';

import { deleteArticle, getArticle } from '@/api/article/article';
import { deleteLike, postLike } from '@/api/article/like';
import Button from '@/components/Button/Button';
import DeleteIcon from '@/components/SvgComponents/DeleteIcon/DeleteIcon';
import EditIcon from '@/components/SvgComponents/EditIcon/EditIcon';
import HeartIcon from '@/components/SvgComponents/HeartIcon/HeartIcon';
import ArticleStrokeIcon from '@/components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import { useStore } from '@/store';
import { DeleteArticleIdRequestType, DeleteLikeRequestType, GetArticleIdResponseType } from '@/types/article';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CommentContainer from '../Comment/CommentContainer';
import { PostLikeRequestType } from './../../../../types/article';
import styles from './ArticlePage.module.css';
import ArticlePageSkeleton from './ArticlePageSkeleton';

export default function ArticlePage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const user = useStore((state) => state.user);
  const pathname = usePathname();
  const id = Number(pathname.split('/').pop());
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: article,
    isPending,
    error,
  } = useQuery<GetArticleIdResponseType, Error>({
    queryKey: ['getArticle', id],
    queryFn: () => getArticle(id, accessToken),
  });

  const deleteArticleMutation = useMutation({
    mutationFn: ({ articleId: id, accessToken }: DeleteArticleIdRequestType) =>
      deleteArticle(id, accessToken as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const handleDeleteClick = () => {
    if (!article) return;

    deleteArticleMutation.mutate(
      { articleId: id, accessToken },
      {
        onSuccess: () => {
          alert('게시물이 성공적으로 삭제되었습니다.');
          router.push('/freeBoard');
        },
        onError: (error) => {
          alert('게시물 삭제에 실패했습니다.');
        },
      }
    );
  };

  const postLikeMutation = useMutation({
    mutationFn: ({ articleId: id, accessToken }: PostLikeRequestType) => postLike(accessToken as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: ({ articleId: id, accessToken }: DeleteLikeRequestType) => deleteLike(id, accessToken as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const handleLikeClick = () => {
    if (!article) return;

    if (!article.isLiked) {
      postLikeMutation.mutate({ articleId: id, accessToken });
    } else {
      deleteLikeMutation.mutate({ articleId: id, accessToken });
    }
  };

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (isPending) {
    return <ArticlePageSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>{article?.title}</h1>
            {article?.writer.name === user?.name && (
              <>
                <div className={styles.buttons}>
                  <Button variant="primary" isLink={true} destination={`/article/${id}/articleEdit`} size="S">
                    수정하기
                  </Button>
                  <Button variant="secondary" isLink={false} onClick={handleDeleteClick} size="S">
                    삭제하기
                  </Button>
                </div>
                <div className={styles.icons}>
                  <EditIcon onClick={() => router.push(`/article/${id}/articleEdit`)} />
                  <DeleteIcon onClick={handleDeleteClick} />
                </div>
              </>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <p>{article?.writer.name}</p>
              {article?.createdAt && <p>{new Date(article.createdAt).toLocaleDateString()}</p>}
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
              <HeartIcon />
              <p>{article?.likeCount}</p>
            </div>
          </div>
        </div>
        <ArticleStrokeIcon />
        <div className={styles.imageWrapper}>
          {article?.image && (
            <Image
              src={article.image}
              alt="대표 이미지"
              layout="responsive"
              width={500}
              height={400}
              className={styles.image}
              loading="eager"
              priority={true}
            />
          )}
        </div>
        <div className={styles.text}>{article?.content}</div>
      </div>
      <Link href="/freeBoard" className={styles.link}>
        목록으로
      </Link>
      <CommentContainer articleId={id} />
    </div>
  );
}
