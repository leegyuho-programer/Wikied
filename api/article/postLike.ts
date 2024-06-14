import { PostLikeRequestType, PostLikeResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

const postLike = async (token: string, articleId: number): Promise<PostLikeResponseType> => {
  try {
    const response = await authBasedRequest<PostLikeResponseType>({
      url: `articles/${articleId}/like`,
      method: 'POST',
      // body: data,
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postLike;
