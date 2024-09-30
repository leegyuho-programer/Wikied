import { PatchPassword, PatchPasswordResponse } from '../../types/auth';
import { authBasedRequest } from '../fetchRequestHandler';

const patchPassword = async (data: PatchPassword): Promise<PatchPasswordResponse> => {
  try {
    const response = await authBasedRequest<PatchPasswordResponse>({
      url: 'users/me/password',
      method: 'PATCH',
      body: data,
    });

    return response;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
};

export default patchPassword;
