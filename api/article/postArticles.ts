import { PostArticleRequestType, PostArticleResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

const postArticle = async (data: PostArticleRequestType, token: string): Promise<PostArticleResponseType> => {
  try {
    const response = await authBasedRequest<PostArticleResponseType>({
      url: 'articles',
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

export default postArticle;
