import { PostProfileRequestType, PostProfileResponseType } from '../../types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

const postProfile = async (data: PostProfileRequestType, token: string): Promise<PostProfileResponseType> => {
  try {
    const response = await authBasedRequest<PostProfileResponseType>({
      url: `profiles`,
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

export default postProfile;
