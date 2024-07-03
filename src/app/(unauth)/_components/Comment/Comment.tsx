import React, { useState } from 'react';
import Image from 'next/image';
import DeleteIcon from '@/components/SvgComponents/DeleteIcon/DeleteIcon';
import EditIcon from '@/components/SvgComponents/EditIcon/EditIcon';
import styles from './Comment.module.css';
import { useStore } from '@/store';
import { GetCommentResponseType } from '@/types/comment';
import { deleteComment, patchComment } from '@/api/comment/comment';
import defaultIMG from '../../../../../public/images/default.jpg';

interface CommentProps {
  comment: GetCommentResponseType['list'][number];
  onUpdate: (updatedComment: GetCommentResponseType['list'][number]) => void;
  onDelete: (commentId: number) => void;
}

export default function Comment({ comment, onUpdate, onDelete }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const accessToken = useStore((state) => state.userAccessToken);
  const currentUserId = useStore((state) => state.userId); // 현재 로그인한 사용자의 ID 가져오기

  const handleEdit = async () => {
    try {
      const updatedComment = await patchComment({ content: editContent }, accessToken, comment.id);
      onUpdate(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error('댓글을 수정하는 중 오류가 발생했습니다:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id, accessToken);
      onDelete(comment.id);
    } catch (error) {
      console.error('댓글을 삭제하는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {comment.writer.image ? (
          <Image
            src={comment.writer.image}
            alt={`${comment.writer.name}의 프로필 이미지`}
            layout="fill"
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <Image src={defaultIMG} alt="기본 이미지" className={styles.image} loading="lazy" />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.name}>{comment.writer.name}</p>
          {currentUserId === comment.writer.id && ( // 현재 사용자가 댓글 작성자인 경우에만 아이콘 표시
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
