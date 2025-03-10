import { PostLoginResponse, PostSignUp } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const signUp = async (data: PostSignUp): Promise<PostLoginResponse> => {
  try {
    const response = await request({ url: 'auth/signUp', method: 'POST', body: data });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '회원가입 중 오류가 발생했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export default signUp;
