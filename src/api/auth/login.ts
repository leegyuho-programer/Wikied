import { PostLogin, PostLoginResponse } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const login = async (data: PostLogin): Promise<PostLoginResponse> => {
  try {
    const response = await request<PostLoginResponse>({
      url: 'auth/signIn',
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
