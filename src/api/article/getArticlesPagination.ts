import { GetArticleResponseType } from '../../types/article';
import { request } from '../fetchRequestHandler';

const getArticlePagination = async (page?: number, pageSize?: number): Promise<GetArticleResponseType> => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/1-99/articles?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getArticlePagination;
