import { DeleteLikeRequestType, PostLikeResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

export const deleteLike = async (articleId: number, token: string): Promise<DeleteLikeRequestType> => {
  try {
    const response = await authBasedRequest<DeleteLikeRequestType>({
      url: `articles/${articleId}/like`,
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

export const postLike = async (token: string, articleId: number): Promise<PostLikeResponseType> => {
  try {
    const response = await authBasedRequest<PostLikeResponseType>({
      url: `articles/${articleId}/like`,
      method: 'POST',
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
