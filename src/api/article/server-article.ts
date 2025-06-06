import { cookies } from 'next/headers';
import { GetArticleIdResponseType } from '@/types/article';

const baseURL = 'https://wikied-api.vercel.app/1-99';

export const getArticleServer = async (articleId: number): Promise<GetArticleIdResponseType> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('userAccessToken')?.value;

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  try {
    const response = await fetch(`${baseURL}/articles/${articleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store', // SSR에서 캐시 방지
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};
