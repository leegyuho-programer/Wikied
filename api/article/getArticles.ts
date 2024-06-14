import { GetArticleResponseType } from '../../types/article';
import { request } from '../fetchRequestHandler';

const getArticles = async (): Promise<GetArticleResponseType> => {
  try {
    const response = await fetch('https://wikied-api.vercel.app/1-99/articles', { method: 'GET' });
    console.log(response);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getArticles;
