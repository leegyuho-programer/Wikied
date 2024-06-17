import { useState, useEffect } from 'react';
import Comment from './Comment';
import styles from './CommentContainer.module.css';
import { useStore } from '../../../../store';
import { PostCommentResponseType, GetCommentResponseType } from '../../../../types/comment';
import { getComment, postComment } from '../../../../api/comment/comment';

// props 타입 정의
interface CommentContainerProps {
  articleId: number;
}

export default function CommentContainer({ articleId }: CommentContainerProps) {
  const [comment, setComment] = useState(''); // 댓글 입력 상태 관리
  const [comments, setComments] = useState<GetCommentResponseType['list']>([]); // 댓글 리스트 상태 관리
  const accessToken = useStore((state) => state.userAccessToken);

  useEffect(() => {
    async function fetchComments() {
      try {
        const { list } = await getComment(articleId);
        setComments(list);
      } catch (error) {
        console.error('댓글을 가져오는 중 오류가 발생했습니다:', error);
      }
    }
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newComment: PostCommentResponseType = await postComment({ content: comment }, accessToken, articleId);
      setComments((prevComments) => [...prevComments, newComment]); // 새로운 댓글 리스트 업데이트
      setComment(''); // 입력 필드 초기화
    } catch (error) {
      console.error('댓글을 등록하는 중 오류가 발생했습니다:', error);
    }
  };

  const handleUpdateComment = (updatedComment: GetCommentResponseType['list'][0]) => {
    setComments((prevComments) => prevComments.map((cmt) => (cmt.id === updatedComment.id ? updatedComment : cmt)));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevComments) => prevComments.filter((cmt) => cmt.id !== commentId));
  };

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
        <button className={styles.button} type="submit">
          댓글 등록
        </button>
      </form>
      {comments.map((cmt) => (
        <Comment key={cmt.id} comment={cmt} onUpdate={handleUpdateComment} onDelete={handleDeleteComment} />
      ))}
    </div>
  );
}
