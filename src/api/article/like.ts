import { DeleteLikeRequestType, PostLikeResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

export const deleteLike = async (articleId: number): Promise<DeleteLikeRequestType> => {
  try {
    const response = await authBasedRequest<DeleteLikeRequestType>({
      url: `articles/${articleId}/like`,
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postLike = async (articleId: number): Promise<PostLikeResponseType> => {
  try {
    const response = await authBasedRequest<PostLikeResponseType>({
      url: `articles/${articleId}/like`,
      method: 'POST',
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
