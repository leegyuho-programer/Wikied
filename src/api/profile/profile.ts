import { GetProfileResponseType, PostProfileRequestType, PostProfileResponseType } from '../../types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

export const postProfile = async (data: PostProfileRequestType): Promise<PostProfileResponseType> => {
  try {
    const response = await authBasedRequest({
      url: `profiles`,
      method: 'POST',
      body: data,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async (page: number, pageSize: number, name?: string): Promise<GetProfileResponseType> => {
  const url = new URL('https://wikied-api.vercel.app/1-99/profiles');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('pageSize', pageSize.toString());
  if (name) {
    url.searchParams.append('name', name);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};
