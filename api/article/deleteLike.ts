import { DeleteLikeRequestType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

const deleteLike = async (articleId: number, token: string): Promise<DeleteLikeRequestType> => {
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

export default deleteLike;
