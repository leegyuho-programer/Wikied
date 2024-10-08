import {
  DeleteNotificationRequestType,
  DeleteNotificationResponseType,
  GetNotificationResponseType,
} from '@/types/notification';
import { authBasedRequest } from '../fetchRequestHandler';

export const getNotification = async (page: number, pageSize: number): Promise<GetNotificationResponseType> => {
  const url = new URL('https://wikied-api.vercel.app/1-99/notification');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('pageSize', pageSize.toString());

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

export const deleteNotification = async (id: number): Promise<DeleteNotificationRequestType> => {
  try {
    const response = await authBasedRequest({
      url: `notification/${id}`,
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
