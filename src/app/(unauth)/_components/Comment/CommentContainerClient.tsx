'use client';

import { getComment, postComment } from '@/api/comment/comment';
import { useStore } from '@/store';
import { GetCommentResponseType } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Comment from './Comment';
import styles from './CommentContainerClient.module.css';
import CommentContainerSkeleton from './CommentContainerSkeleton';

interface Props {
  articleId: number;
  initialData?: GetCommentResponseType['list'] | null;
  hasError?: boolean;
}

export default function CommentContainerClient({ articleId, initialData, hasError = false }: Props) {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);

  const shouldFetchOnClient = hasError || !initialData;

  const {
    data: comments = [],
    isPending,
    error,
  } = useQuery<GetCommentResponseType['list'], Error>({
    queryKey: ['comments', articleId],
    queryFn: () => getComment(articleId).then((response) => response.list),
    ...(initialData && !hasError && { initialData }),
    enabled: shouldFetchOnClient,
    retry: shouldFetchOnClient ? 1 : false,
  });

  const postCommentMutation = useMutation({
    mutationFn: (newComment: string) => postComment({ content: newComment }, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
    onError: (error) => {
      console.error('댓글을 등록하는 중 오류가 발생했습니다:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postCommentMutation.mutate(comment);
    setComment('');
  };

  // 클라이언트에서 데이터를 가져오는 중인 경우 스켈레톤 표시
  if (shouldFetchOnClient && isPending) {
    return <CommentContainerSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.comment}>
        댓글<span className={styles.span}>{comments.length}</span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해 주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {user && (
          <button className={styles.button} type="submit">
            댓글 등록
          </button>
        )}
      </form>
      {comments.map((cmt) => (
        <Comment key={cmt.id} comment={cmt} articleId={articleId} />
      ))}
    </div>
  );
}
