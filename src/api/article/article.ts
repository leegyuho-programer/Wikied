import {
  DeleteArticleIdRequestType,
  GetArticleIdResponseType,
  PatchArticleRequestType,
  PatchArticleResponseType,
} from '../../types/article';
import { authBasedRequest } from '../fetchRequestHandler';

export const getArticle = async (articleId: number, accessToken: string): Promise<GetArticleIdResponseType> => {
  try {
    const response = await fetch(`https://wikied-api.vercel.app/1-99/articles/${articleId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const patchArticle = async (
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

export const deleteArticle = async (articleId: number, token: string): Promise<DeleteArticleIdRequestType> => {
  try {
    const response = await authBasedRequest<DeleteArticleIdRequestType>({
      url: `articles/${articleId}`,
      method: 'DELETE',
      token,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
