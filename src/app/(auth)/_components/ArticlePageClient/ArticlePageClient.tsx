'use client';

import { deleteArticle, getArticle } from '@/api/article/article';
import { deleteLike, postLike } from '@/api/article/like';
import CommentContainer from '@/app/(unauth)/_components/Comment/CommentContainer';
import Button from '@/components/Button/Button';
import LinkButton from '@/components/Button/LinkButton';
import { DeleteIcon, EditIcon, HeartIcon, StrokeIcon } from '@/components/SvgComponents';
import { useStore } from '@/store';
import {
  DeleteArticleIdRequestType,
  DeleteLikeRequestType,
  GetArticleIdResponseType,
  PostLikeRequestType,
} from '@/types/article';
import { formatDate } from '@/utils/day';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ArticlePageSkeleton from '../ArticlePage/ArticlePageSkeleton';
import styles from '../ArticlePage/ArticlePage.module.css';

interface Props {
  initialData: GetArticleIdResponseType | null;
  articleId: number;
  hasError?: boolean;
}

export default function ArticlePageClient({ initialData, articleId, hasError = false }: Props) {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 서버에서 성공적으로 데이터를 받은 경우에는 클라이언트 쿼리를 비활성화
  const shouldFetchOnClient = hasError || !initialData;

  // 서버에서 받은 초기 데이터를 사용하되, 에러가 있거나 데이터가 없으면 클라이언트에서 페치
  const {
    data: article,
    isPending,
    error,
  } = useQuery<GetArticleIdResponseType, Error>({
    queryKey: ['getArticle', articleId],
    queryFn: () => getArticle(articleId),
    ...(initialData && !hasError && { initialData }),
    enabled: shouldFetchOnClient,
    retry: shouldFetchOnClient ? 1 : false, // 서버 데이터가 있으면 재시도하지 않음
  });

  // 클라이언트에서도 데이터를 가져오지 못한 경우 404로 리다이렉트
  useEffect(() => {
    if (error && !isPending) {
      router.push('/404');
    }
  }, [error, isPending, router]);

  const deleteArticleMutation = useMutation({
    mutationFn: ({ articleId }: DeleteArticleIdRequestType) => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', articleId] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['bestArticles'] });
    },
  });

  const handleDeleteClick = () => {
    if (!article) return;

    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteArticleMutation.mutate(
        { articleId },
        {
          onSuccess: () => {
            alert('게시물이 성공적으로 삭제되었습니다.');
            router.push('/freeBoard');
          },
          onError: (error) => {
            alert('게시물 삭제에 실패했습니다.');
            console.error('Delete error:', error);
          },
        }
      );
    }
  };

  const postLikeMutation = useMutation({
    mutationFn: ({ articleId }: PostLikeRequestType) => postLike(articleId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getArticle', articleId] });

      const previousArticle = queryClient.getQueryData<GetArticleIdResponseType>(['getArticle', articleId]);

      if (previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', articleId], {
          ...previousArticle,
          likeCount: previousArticle.likeCount + 1,
          isLiked: true,
        });
      }

      return { previousArticle };
    },
    onError: (err, variables, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', articleId], context.previousArticle);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', articleId] });
      queryClient.invalidateQueries({ queryKey: ['bestArticles'] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: ({ articleId }: DeleteLikeRequestType) => deleteLike(articleId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getArticle', articleId] });

      const previousArticle = queryClient.getQueryData<GetArticleIdResponseType>(['getArticle', articleId]);

      if (previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', articleId], {
          ...previousArticle,
          likeCount: previousArticle.likeCount - 1,
          isLiked: false,
        });
      }

      return { previousArticle };
    },
    onError: (err, variables, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', articleId], context.previousArticle);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getArticle', articleId] });
      queryClient.invalidateQueries({ queryKey: ['bestArticles'] });
    },
  });

  const handleLikeClick = () => {
    if (!article) return;

    if (!article.isLiked) {
      postLikeMutation.mutate({ articleId });
    } else {
      deleteLikeMutation.mutate({ articleId });
    }
  };

  // 클라이언트에서 데이터를 가져오는 중인 경우에만 스켈레톤 표시
  if (shouldFetchOnClient && isPending) {
    return <ArticlePageSkeleton />;
  }

  // 최종적으로 article이 없는 경우 (서버/클라이언트 모두 실패)
  if (!article) {
    router.push('/404');
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            {article.writer.name === user?.name && (
              <>
                <div className={styles.buttons}>
                  <LinkButton variant="primary" destination={`/articleEdit/${articleId}`} size="S">
                    수정하기
                  </LinkButton>
                  <Button
                    variant="secondary"
                    onClick={handleDeleteClick}
                    size="S"
                    disabled={deleteArticleMutation.isPending}
                  >
                    {deleteArticleMutation.isPending ? '삭제 중...' : '삭제하기'}
                  </Button>
                </div>
                <div className={styles.icons}>
                  <EditIcon onClick={() => router.push(`/articleEdit/${articleId}`)} />
                  <DeleteIcon onClick={handleDeleteClick} />
                </div>
              </>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <p>{article.writer.name}</p>
              <p>{formatDate(article.createdAt)}</p>
            </div>
            <div
              className={styles.like}
              onClick={handleLikeClick}
              style={{
                cursor: 'pointer',
                opacity: postLikeMutation.isPending || deleteLikeMutation.isPending ? 0.7 : 1,
              }}
            >
              <HeartIcon color={article.isLiked ? '#D14343' : '#8F95B2'} />
              <p>{article.likeCount}</p>
            </div>
          </div>
        </div>
        <StrokeIcon />
        <div className={styles.imageWrapper}>
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              layout="responsive"
              width={500}
              height={400}
              className={styles.image}
              loading="eager"
              priority={true}
            />
          )}
        </div>
        <div className={styles.text}>{article.content}</div>
      </div>
      <Link href="/board" className={styles.link}>
        목록으로
      </Link>
      <CommentContainer articleId={articleId} />
    </div>
  );
}
