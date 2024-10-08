'use client';

import { getArticle, patchArticle } from '@/api/article/article';
import { GetArticleIdResponseType, PatchArticleRequestType, PatchArticleResponseType } from '@/types/article';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styles from './ArticleEditPage.module.css';

interface FormData {
  title: string;
  content: string;
}

export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<GetArticleIdResponseType>({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
    }
  }, [article, setValue]);

  const updateArticleMutation = useMutation<PatchArticleResponseType, Error, PatchArticleRequestType>({
    mutationFn: (patchedArticle) => patchArticle(patchedArticle, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      alert('게시물이 성공적으로 수정되었습니다.');
      router.push(`/article/${articleId}`);
    },
    onError: (error) => {
      console.error('게시글 수정에 실패했습니다:', error);
      alert('수정에 실패했습니다.');
    },
  });

  const onSubmit = (data: FormData) => {
    updateArticleMutation.mutate(data);
  };

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (isError) return <div className={styles.error}>에러가 발생했습니다.</div>;
  if (!article) return <div className={styles.notFound}>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="게시물 제목입니다."
          {...register('title', { required: '제목을 입력해주세요.' })}
          className={styles.input}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <textarea
          placeholder="내용"
          {...register('content', { required: '내용을 입력해주세요.' })}
          className={styles.textarea}
        ></textarea>
        {errors.content && <p className={styles.error}>{errors.content.message}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || updateArticleMutation.isPending}
        >
          {updateArticleMutation.isPending ? '수정 중...' : '게시물 수정'}
        </button>
      </form>
    </div>
  );
}
