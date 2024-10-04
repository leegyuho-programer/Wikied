import { setCookie, parseCookies, destroyCookie } from 'nookies';

export const saveTokenToCookies = (tokenKey: string, tokenValue: string) => {
  setCookie(null, tokenKey, tokenValue, {
    maxAge: 30 * 24 * 60 * 60, // 30일 유지
    path: '/',
    secure: true, // HTTPS 전용
    sameSite: 'strict',
  });
};

export const getTokenFromCookies = (tokenKey: string) => {
  const cookies = parseCookies();
  return cookies[tokenKey];
};

export const removeTokenFromCookies = (tokenKey: string) => {
  destroyCookie(null, tokenKey, { path: '/' });
};
