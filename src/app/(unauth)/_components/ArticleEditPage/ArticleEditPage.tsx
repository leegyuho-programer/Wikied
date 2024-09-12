'use client';

import { getArticle, patchArticle } from '@/api/article/article';
import { useStore } from '@/store';
import { GetArticleIdResponseType, PatchArticleRequestType, PatchArticleResponseType } from '@/types/article';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styles from '../ArticlePage/ArticlePage.module.css';

export default function ArticleEditPage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const articleId = useStore((state) => state.articleId);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<GetArticleIdResponseType>({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId, accessToken),
    enabled: !!articleId && !!accessToken,
  });

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  const updateArticleMutation = useMutation<PatchArticleResponseType, Error, PatchArticleRequestType>({
    mutationFn: (patchedArticle) => patchArticle(patchedArticle, accessToken, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      router.push(`/article/${articleId}`);
    },
    onError: (error) => {
      console.error('게시글 수정에 실패했습니다:', error);
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const patchedArticle: PatchArticleRequestType = {
      title,
      content,
    };

    updateArticleMutation.mutate(patchedArticle);
  };

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>게시글 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.headerWrapper}>
            <div className={styles.header}>
              <div>
                <label>제목:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
              </div>
              <div>
                <label>내용:</label>
                <textarea value={content} onChange={handleContentChange} />
              </div>
            </div>
            <button type="submit" disabled={updateArticleMutation.isPending}>
              {updateArticleMutation.isPending ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
