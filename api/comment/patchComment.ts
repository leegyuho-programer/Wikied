import { PatchCommentRequestType, PatchCommentResponseType } from '../../types/comment';
import { authBasedRequest } from '../fetchRequestHandler';

const patchComment = async (
  data: PatchCommentRequestType,
  token: string,
  commentId: number
): Promise<PatchCommentResponseType> => {
  try {
    const response = await authBasedRequest<PatchCommentResponseType>({
      url: `comments/${commentId}`,
      method: 'PATCH',
      body: data,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default patchComment;
