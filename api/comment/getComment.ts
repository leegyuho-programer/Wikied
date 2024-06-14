import { GetCommentResponseType } from '../../types/comment';
import { request } from '../fetchRequestHandler';

const getComment = async (
  articleId: number,
  limit: number = 10,
  cursor: number = 0
): Promise<GetCommentResponseType> => {
  try {
    const response = await fetch(
      `https://wikied-api.vercel.app/1-99/articles/${articleId}/comments?limit=${limit}&cursor=${cursor}`,
      { method: 'GET' }
    );
    return response.json();
  } catch (error) {
    console.error('댓글을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export default getComment;
