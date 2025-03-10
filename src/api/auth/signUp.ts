import { PostLoginResponse, PostSignUp } from '../../types/auth';
import { request } from '../fetchRequestHandler';

const handleSignUpError = (errorData: any): string => {
  if (errorData?.message?.includes('Internal Server Error') || errorData?.message?.includes('이미 사용중인 닉네임')) {
    return errorData.message;
  }

  if (errorData.message.includes('이미 사용중인 이메일') || errorData.status === 400) {
    return errorData.message;
  }

  return errorData?.message || '회원가입 중 오류가 발생했습니다.';
};

const signUp = async (data: PostSignUp): Promise<PostLoginResponse> => {
  const response = await request({ url: 'auth/signUp', method: 'POST', body: data });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(handleSignUpError(errorData));
  }

  return response.json();
};

export default signUp;
