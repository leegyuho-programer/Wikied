import { PostCommentRequestType, PostCommentResponseType } from '../../types/comment';
import { authBasedRequest } from '../fetchRequestHandler';

const postComment = async (
  data: PostCommentRequestType,
  token: string,
  articleId: number
): Promise<PostCommentResponseType> => {
  try {
    const response = await authBasedRequest<PostCommentResponseType>({
      url: `articles/${articleId}/comments`,
      method: 'POST',
      body: data,
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postComment;
