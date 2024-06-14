import { DeleteCommentRequestType } from '../../types/comment';
import { authBasedRequest } from '../fetchRequestHandler';

const deleteComment = async (commentId: number, token: string): Promise<DeleteCommentRequestType> => {
  try {
    const response = await authBasedRequest<DeleteCommentRequestType>({
      url: `comments/${commentId}`,
      method: 'DELETE',
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteComment;
