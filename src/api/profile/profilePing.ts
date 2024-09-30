import { GetProfilePingResponseType, PostProfilePingRequestType, PostProfilePingResponseType } from '@/types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

export const postProfilePing = async (
  data: PostProfilePingRequestType,
  code: string
): Promise<PostProfilePingResponseType> => {
  try {
    const response = await authBasedRequest<PostProfilePingResponseType>({
      url: `profiles/${code}/ping`,
      method: 'POST',
      body: data,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
