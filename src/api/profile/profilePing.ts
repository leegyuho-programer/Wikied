import { GetProfilePingResponseType, PostProfilePingRequestType, PostProfilePingResponseType } from '@/types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

export const postProfilePing = async (
  data: PostProfilePingRequestType,
  code: string,
  token: string
): Promise<PostProfilePingResponseType> => {
  try {
    console.log('Sending Data:', data, 'Code:', code, 'Token:', token);
    const response = await authBasedRequest<PostProfilePingResponseType>({
      url: `profiles/${code}/ping`,
      method: 'POST',
      body: data,
      token,
    });
    console.log(response);
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
