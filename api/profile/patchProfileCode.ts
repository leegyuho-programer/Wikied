import { PatchProfileCodeRequestType, PatchProfileCodeResponseType } from '../../types/profile';
import { authBasedRequest } from '../fetchRequestHandler';

const patchProfileCode = async (
  data: PatchProfileCodeRequestType,
  code: string,
  token: string
): Promise<PatchProfileCodeResponseType> => {
  try {
    const response = await authBasedRequest<PatchProfileCodeResponseType>({
      url: `profiles/${code}`,
      method: 'PATCH',
      body: data,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default patchProfileCode;
