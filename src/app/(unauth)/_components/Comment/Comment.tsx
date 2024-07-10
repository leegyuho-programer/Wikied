import { deleteComment, patchComment } from '@/api/comment/comment';
import DeleteIcon from '@/components/SvgComponents/DeleteIcon/DeleteIcon';
import EditIcon from '@/components/SvgComponents/EditIcon/EditIcon';
import { useStore } from '@/store';
import { GetCommentResponseType } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import defaultIMG from '../../../../../public/images/default.jpg';
import styles from './Comment.module.css';

interface CommentProps {
  comment: GetCommentResponseType['list'][number];
  articleId: number;
}

export default function Comment({ comment, articleId }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const accessToken = useStore((state) => state.userAccessToken);
  const currentUserId = useStore((state) => state.userId); // 현재 로그인한 사용자의 ID 가져오기
  const queryClient = useQueryClient();

  const patchCommentMutation = useMutation({
    mutationFn: () => patchComment({ content: editContent }, accessToken, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
    onError: (error) => {
      console.error('댓글을 수정하는 중 오류가 발생했습니다:', error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
    onError: (error) => {
      console.error('댓글을 삭제하는 중 오류가 발생했습니다:', error);
    },
  });

  const handleEdit = () => {
    patchCommentMutation.mutate();
  };

  const handleDelete = async () => {
    deleteCommentMutation.mutate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {comment.writer.image ? (
          <Image
            src={comment.writer.image}
            alt={`${comment.writer.name}의 프로필 이미지`}
            layout="responsive"
            width={50}
            height={50}
            className={styles.image}
          />
        ) : (
          <Image
            src={defaultIMG}
            alt="기본 이미지"
            className={styles.image}
            width={50}
            height={50}
            layout="responsive"
          />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.name}>{comment.writer.name}</p>
          {currentUserId === comment.writer.id && (
            <div className={styles.icon}>
              <EditIcon onClick={() => setIsEditing(!isEditing)} />
              <DeleteIcon onClick={handleDelete} />
            </div>
          )}
        </div>
        {isEditing ? (
          <div>
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            <button onClick={handleEdit}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        ) : (
          <p className={styles.comment}>{comment.content}</p>
        )}
        <p className={styles.day}>{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
