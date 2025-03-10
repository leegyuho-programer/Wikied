import { GetProfilePingResponseType, PostProfilePingRequestType, PostProfilePingResponseType } from '@/types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

export const postProfilePing = async (
  data: PostProfilePingRequestType,
  code: string
): Promise<PostProfilePingResponseType> => {
  const response = await authBasedRequest({
    url: `profiles/${code}/ping`,
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '응답을 처리하는 중 오류가 발생했습니다.' }));

    throw new Error(errorData?.message);
  }

  return response;
};

export const getProfilePing = async (code: string): Promise<GetProfilePingResponseType> => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/1-99/profiles/${code}/ping`, { method: 'GET' });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
