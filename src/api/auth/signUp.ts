import { PostLoginResponse, PostSignUp } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const signUp = async (data: PostSignUp): Promise<PostLoginResponse> => {
  const response = await request({ url: 'auth/signUp', method: 'POST', body: data });

  // ✅ response가 undefined일 경우 예외 처리
  if (!response) {
    throw new Error('서버 응답이 없습니다.');
  }

  if (response.status === 400 || response.status === 500) {
    const errorData = await response.json().catch(() => ({ message: '응답을 처리하는 중 오류가 발생했습니다.' }));
    throw new Error(errorData?.message);
  }

  // ✅ headers가 undefined일 가능성 체크
  const contentType = response.headers?.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      throw new Error('응답을 처리하는 중 오류가 발생했습니다.');
    }
  } else {
    return {} as PostLoginResponse;
  }
};

export default signUp;
