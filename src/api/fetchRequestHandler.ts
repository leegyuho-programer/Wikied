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
      throw new Error('리프레시 토큰을 찾을 수 없습니다. 다시 로그인 해주세요.');
    }

    const response = await fetch(`${baseURL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: userRefreshToken }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('리프레시 토큰이 유효하지 않습니다. 다시 로그인 해주세요.');
      } else {
        throw new Error(`토큰 재발급 요청 실패: ${response.statusText}`);
      }
    }

    const { accessToken } = await response.json();

    setCookie(null, 'userAccessToken', accessToken, {
      maxAge: 30 * 60, // 30분
      path: '/',
      secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 true
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
    const queryString = params ? new URLSearchParams(params).toString() : '';
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
      // 토큰이 만료되었을 가능성이 있으므로 재발급 시도
      const newToken = await reissueAccessToken();
      if (newToken) {
        // 새로운 토큰으로 요청 재시도
        const retryResponse = await makeRequest(newToken);
        return handleResponse(retryResponse);
      } else {
        throw new Error('토큰을 재발급받을 수 없습니다. 다시 로그인 해주세요.');
      }
    }
    if (response.status === 403) {
      console.error('Forbidden: You do not have permission to perform this action.');
      // 필요 시 로그아웃하거나 사용자에게 알림
      throw new Error('권한이 없습니다. 관리자에게 문의하세요.');
    }
    const errorData = await response.json();
    console.error('Request failed with error:', errorData);
    throw new Error(`요청 실패: ${errorData.message || response.statusText}`);
  };

  const getValidAccessToken = async (): Promise<string> => {
    let { userAccessToken } = parseCookies();
    if (!userAccessToken) {
      const newToken = await reissueAccessToken();
      if (!newToken) {
        throw new Error('유효한 액세스 토큰을 획득할 수 없습니다. 다시 로그인 해주세요.');
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
    console.error('요청 실패:', error);
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
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const fullUrl = queryString ? `${baseURL}/${url}?${queryString}` : `${baseURL}/${url}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`요청 실패: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('요청 처리 중 오류 발생:', error);
    throw error;
  }
};
