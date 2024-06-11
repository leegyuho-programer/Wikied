import { PostArticleResponseType } from '../../types/article';
import { request } from '../fetchRequestHandler';

const getArticle = async () => {
  try {
    const response = await request<PostArticleResponseType>({
      url: 'articles',
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export default getArticle;
