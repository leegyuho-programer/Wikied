import { GetArticleResponseType, PostArticleRequestType, PostArticleResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

export const getArticles = async (): Promise<GetArticleResponseType> => {
  try {
    const response = await fetch('https://wikied-api.vercel.app/1-99/articles', { method: 'GET' });
    console.log(response);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postArticles = async (data: PostArticleRequestType, token: string): Promise<PostArticleResponseType> => {
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
