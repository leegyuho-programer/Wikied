import { GetArticleResponseType } from '../../types/article';

const getArticlePagination = async (
  page: number = 1,
  pageSize: number = 10,
  orderBy: 'recent' | 'like' = 'recent',
  keyword?: string
): Promise<GetArticleResponseType> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy: orderBy,
    });

    if (keyword) {
      params.append('keyword', keyword);
    }

    const response = await fetch(`https://wikied-api.vercel.app/1-99/articles?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export default getArticlePagination;
