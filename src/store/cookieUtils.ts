import { setCookie, parseCookies, destroyCookie } from 'nookies';

export const saveTokenToCookies = (tokenKey: string, tokenValue: string) => {
  setCookie(null, tokenKey, tokenValue, {
    maxAge: 30 * 24 * 60 * 60, // 30일 유지
    path: '/', // 쿠키가 적용되는 URL 경로 (이 경우, 모든 페이지에서 쿠키 접근 가능)
    httpOnly: true,
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
