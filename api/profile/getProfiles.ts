import { GetProfileResponseType } from '../../types/profile';
import { request } from '../fetchRequestHandler';

const getProfile = async () => {
  try {
    const response = await request<GetProfileResponseType>({
      url: 'profiles',
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export default getProfile;
