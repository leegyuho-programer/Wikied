type AuthBasedRequestType = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: { [key: string]: any };
  token: string;
  body?: any;
};

type RequestType = Omit<AuthBasedRequestType, 'token'>;

/** token based request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param token auth token
 * @param body request body
 */

export const authBasedRequest = async <T>({ url, method = 'GET', params, token, body }: AuthBasedRequestType) => {
  if (!token) {
    const storedToken = localStorage.getItem('store');
    if (!storedToken) {
      throw new Error('Token not found in localStorage');
    }
    token = JSON.parse(storedToken).state.userAccessToken;
  }

  const baseURL = 'https://wikied-api.vercel.app/1-99';
  const queryString = new URLSearchParams(params).toString();

  const fullUrl = queryString ? `${baseURL}/${url}?${queryString}` : `${baseURL}/${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body) ?? '',
  });

  if (!response.ok) {
    throw new Error('something went to wrong');
  }

  return (await response.json()) as T;
};

/** request handler
 * @param url request url
 * @param method http method type
 * @param params request parameters
 * @param body request body
 */

export const request = async <T>({ url, method = 'GET', params, body }: RequestType) => {
  const baseURL = 'https://wikied-api.vercel.app/1-99';
  const queryString = new URLSearchParams(params).toString();

  const fullUrl = queryString ? `${baseURL}/${url}?${queryString}` : `${baseURL}/${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) ?? '',
  });

  if (!response.ok) {
    throw new Error('something went to wrong');
  }

  return (await response.json()) as T;
};
