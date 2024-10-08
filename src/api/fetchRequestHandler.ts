import { parseCookies, setCookie } from 'nookies';

type AuthBasedRequestType = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: { [key: string]: any };
  body?: any;
};

type RequestType = AuthBasedRequestType;

const baseURL = 'https://wikied-api.vercel.app/1-99';

// 리프레시 토큰을 사용하여 액세스 토큰을 재발급
const reissueAccessToken = async (): Promise<string | null> => {
  try {
    const { userRefreshToken } = parseCookies();
    if (!userRefreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await fetch(`${baseURL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: userRefreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const { accessToken } = await response.json();
    setCookie(null, 'userAccessToken', accessToken, {
      maxAge: 30 * 60,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
    return accessToken;
  } catch (error) {
    console.error('액세스 토큰 재발급 실패:', error);
    return null;
  }
};

/** token based request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */
export const authBasedRequest = async ({ url, method = 'GET', params, body }: AuthBasedRequestType): Promise<any> => {
  const makeRequest = async (accessToken: string): Promise<Response> => {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${baseURL}/${url}?${queryString}` : `${baseURL}/${url}`;

    return fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  const handleResponse = async (response: Response): Promise<any> => {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 401) {
      // Token이 만료되었을 가능성이 있으므로 재발급 시도
      const newToken = await reissueAccessToken();
      if (newToken) {
        // 새로운 토큰으로 요청 재시도
        const retryResponse = await makeRequest(newToken);
        return handleResponse(retryResponse);
      } else {
        throw new Error('Failed to refresh token');
      }
    }
    throw new Error('Something went wrong');
  };

  const getValidAccessToken = async (): Promise<string> => {
    let { userAccessToken } = parseCookies();
    if (!userAccessToken) {
      const newToken = await reissueAccessToken();
      if (!newToken) {
        throw new Error('Unable to obtain access token');
      }
      userAccessToken = newToken;
    }
    return userAccessToken;
  };

  try {
    const accessToken = await getValidAccessToken();
    const initialResponse = await makeRequest(accessToken);
    return handleResponse(initialResponse);
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

/** request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */
export const request = async ({ url, method = 'GET', params, body }: RequestType): Promise<any> => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${baseURL}/${url}?${queryString}` : `${baseURL}/${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return await response.json();
};
