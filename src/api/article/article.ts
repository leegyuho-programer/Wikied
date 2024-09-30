import {
  DeleteArticleIdRequestType,
  GetArticleIdResponseType,
  PatchArticleRequestType,
  PatchArticleResponseType,
} from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

export const getArticle = async (articleId: number): Promise<GetArticleIdResponseType> => {
  try {
    const response = await authBasedRequest<GetArticleIdResponseType>({
      url: `articles/${articleId}`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const patchArticle = async (
  data: PatchArticleRequestType,
  articleId: number
): Promise<PatchArticleResponseType> => {
  try {
    const response = await authBasedRequest<PatchArticleResponseType>({
      url: `articles/${articleId}`,
      method: 'PATCH',
      body: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (articleId: number): Promise<DeleteArticleIdRequestType> => {
  try {
    const response = await authBasedRequest<DeleteArticleIdRequestType>({
      url: `articles/${articleId}`,
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
