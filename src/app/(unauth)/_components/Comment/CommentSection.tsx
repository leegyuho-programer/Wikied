import CommentContainerClient from './CommentContainerClient';
import { getComment } from '@/api/comment/comment';

interface Props {
  articleId: number;
}

export default async function CommentSection({ articleId }: Props) {
  try {
    const initialComments = await getComment(articleId);
    return <CommentContainerClient initialData={initialComments.list} articleId={articleId} />;
  } catch (error) {
    console.error('서버에서 댓글 데이터 페칭에 실패했습니다.:', error);
    return <CommentContainerClient initialData={null} articleId={articleId} hasError={true} />;
  }
}
