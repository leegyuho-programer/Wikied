import { PatchArticleRequestType, PatchArticleResponseType } from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

const patchArticle = async (
  data: PatchArticleRequestType,
  token: string,
  articleId: number
): Promise<PatchArticleResponseType> => {
  try {
    const response = await authBasedRequest<PatchArticleResponseType>({
      url: `articles/${articleId}`,
      method: 'PATCH',
      body: data,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default patchArticle;
