'use client';

import { deleteArticle, getArticle } from '@/api/article/article';
import { deleteLike, postLike } from '@/api/article/like';
import CommentContainer from '@/app/(unauth)/_components/Comment/CommentContainer';
import Button from '@/components/Button/Button';
import LinkButton from '@/components/Button/LinkButton';
import { DeleteIcon, EditIcon, HeartIcon, StrokeIcon } from '@/components/SvgComponents';
import { useStore } from '@/store';
import { DeleteArticleIdRequestType, DeleteLikeRequestType, GetArticleIdResponseType } from '@/types/article';
import { formatDate } from '@/utils/day';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PostLikeRequestType } from './../../../../types/article';
import styles from './ArticlePage.module.css';
import ArticlePageSkeleton from './ArticlePageSkeleton';

export default function ArticlePage() {
  const user = useStore((state) => state.user);
  const pathname = usePathname();
  const id = Number(pathname.split('/').pop());
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: article, isPending } = useQuery<GetArticleIdResponseType, Error>({
    queryKey: ['getArticle', id],
    queryFn: () => getArticle(id),
  });

  const deleteArticleMutation = useMutation({
    mutationFn: ({ articleId: id }: DeleteArticleIdRequestType) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const handleDeleteClick = () => {
    if (!article) return;

    deleteArticleMutation.mutate(
      { articleId: id },
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
    mutationFn: ({ articleId: id }: PostLikeRequestType) => postLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: ({ articleId: id }: DeleteLikeRequestType) => deleteLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const handleLikeClick = () => {
    if (!article) return;

    if (!article.isLiked) {
      postLikeMutation.mutate({ articleId: id });
    } else {
      deleteLikeMutation.mutate({ articleId: id });
    }
  };

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
                  <LinkButton variant="primary" destination={`/articleEdit/${id}`} size="S">
                    수정하기
                  </LinkButton>
                  <Button variant="secondary" onClick={handleDeleteClick} size="S">
                    삭제하기
                  </Button>
                </div>
                <div className={styles.icons}>
                  <EditIcon onClick={() => router.push(`/articleEdit/${id}`)} />
                  <DeleteIcon onClick={handleDeleteClick} />
                </div>
              </>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <p>{article?.writer.name}</p>
              {article?.createdAt && <p>{formatDate(article.createdAt)}</p>}
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
              <HeartIcon color={article?.isLiked ? '#D14343' : '#8F95B2'} />
              <p>{article?.likeCount}</p>
            </div>
          </div>
        </div>
        <StrokeIcon />
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
