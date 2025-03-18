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
      queryClient.invalidateQueries({ queryKey: ['articles'] });
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
    onMutate: async () => {
      // 1. 기존 데이터가 변경되지 않도록 현재 진행 중인 'getArticle' 쿼리를 취소한다.
      await queryClient.cancelQueries({ queryKey: ['getArticle', id] });

      // 2. 이전 데이터를 저장하여, 나중에 되돌릴 수 있도록 한다.
      const previousArticle = queryClient.getQueryData<GetArticleIdResponseType>(['getArticle', id]);

      // 3. 좋아요 수와 isLiked 값을 증가시켜 UI를 먼저 업데이트한다.
      if (previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', id], {
          ...previousArticle,
          likeCount: previousArticle.likeCount + 1,
          isLiked: true,
        });
      }

      // 4. 기존 데이터를 되돌릴 수 있도록 저장한 이전 데이터를 반환한다.
      return { previousArticle };
    },
    onError: (err, variables, context) => {
      // 요청이 실패하면, onMutate에서 저장했던 이전 데이터를 사용하여 되돌린다.
      if (context?.previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', id], context.previousArticle);
      }
    },
    onSettled: () => {
      // 요청이 끝나면(성공/실패 상관없이) 'getArticle' 데이터를 다시 가져와 최신 상태를 유지한다.
      queryClient.invalidateQueries({ queryKey: ['getArticle', id] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: ({ articleId: id }: DeleteLikeRequestType) => deleteLike(id),
    onMutate: async () => {
      // 1. 기존 'getArticle' 쿼리를 취소하여 변경 사항이 덮어씌워지는 것을 방지
      await queryClient.cancelQueries({ queryKey: ['getArticle', id] });

      // 2. 기존 데이터를 저장 (되돌릴 때 필요)
      const previousArticle = queryClient.getQueryData<GetArticleIdResponseType>(['getArticle', id]);

      // 3. 좋아요 수와 isLiked 값을 감소시켜 UI를 먼저 업데이트
      if (previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', id], {
          ...previousArticle,
          likeCount: previousArticle.likeCount - 1,
          isLiked: false,
        });
      }

      // 4. 기존 데이터를 되돌릴 수 있도록 반환
      return { previousArticle };
    },
    onError: (err, variables, context) => {
      // 요청이 실패하면, onMutate에서 저장했던 이전 데이터를 사용하여 되돌린다.
      if (context?.previousArticle) {
        queryClient.setQueryData<GetArticleIdResponseType>(['getArticle', id], context.previousArticle);
      }
    },
    onSettled: () => {
      // 요청이 끝나면(성공/실패 상관없이) 'getArticle' 데이터를 다시 가져와 최신 상태를 유지한다.
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
