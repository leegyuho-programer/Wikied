import { PostArticleRequestType, PostArticleResponseType } from '../../types/article';
import { request } from '../fetchRequestHandler';

const postArticle = async (data: PostArticleRequestType): Promise<PostArticleResponseType> => {
  try {
    const response = await request<PostArticleResponseType>({
      url: 'articles',
      method: 'POST',
      body: data,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postArticle;
