import { GetProfileCodeResponseType, PatchProfileCodeRequestType, PatchProfileCodeResponseType } from '@/types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

export const getProfileCode = async (code: string): Promise<GetProfileCodeResponseType> => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/1-99/profiles/${code}`, { method: 'GET' });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchProfileCode = async (
  data: PatchProfileCodeRequestType,
  code: string
): Promise<PatchProfileCodeResponseType> => {
  try {
    const response = await authBasedRequest({
      url: `profiles/${code}`,
      method: 'PATCH',
      body: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
