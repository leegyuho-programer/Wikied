import { GetProfileCodeResponseType, GetProfileResponseType } from '../../types/profile';
import { request } from '../fetchRequestHandler';

const getProfileCode = async (code: string): Promise<GetProfileCodeResponseType> => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/1-99/profiles/${code}`, { method: 'GET' });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getProfileCode;
