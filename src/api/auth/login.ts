import { PostLogin, PostLoginResponse } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const login = async (data: PostLogin): Promise<PostLoginResponse> => {
  const response = await request({
    url: 'auth/signIn',
    method: 'POST',
    body: data,
  });

  if (response.status === 400) {
    const errorData = await response.json().catch(() => ({ message: '응답을 처리하는 중 오류가 발생했습니다.' }));
    throw new Error(errorData?.message);
  }

  return response;
};

export default login;
