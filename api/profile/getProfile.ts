// import { GetProfileResponseType } from '../../types/profile';
// import { request } from '../fetchRequestHandler';

// const getProfile = async (page: number, pageSize: number, name: string): Promise<GetProfileResponseType> => {
//   try {
//     const response = await fetch('https://wikied-api.vercel.app/1-99/profiles', { method: 'GET' });
//     return response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export default getProfile;

import { GetProfileResponseType } from '../../types/profile';

const getProfile = async (page: number, pageSize: number, name?: string): Promise<GetProfileResponseType> => {
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

export default getProfile;
