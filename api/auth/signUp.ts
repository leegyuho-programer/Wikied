import { PostLoginResponse, PostSignUp } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const signUp = async (data: PostSignUp): Promise<PostLoginResponse> => {
  try {
    const response = await request<PostLoginResponse>({ url: 'auth/signUp', method: 'POST', body: data });
    console.log('회원가입 성공:', response);
    return response;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export default signUp;
