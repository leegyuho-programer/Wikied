import { PostArticleRequestType, PostArticleResponseType } from '../../types/article';
import { request } from '../fetchRequestHandler';

const login = async (data: PostArticleRequestType): Promise<PostArticleResponseType> => {
  try {
    const response = await request<PostArticleResponseType>({
      url: 'auth/articles',
      method: 'POST',
      body: data,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export default login;
