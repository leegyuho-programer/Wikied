import { setCookie, parseCookies, destroyCookie } from 'nookies';

export const saveTokenToCookies = (tokenKey: string, tokenValue: string, type: 'AT' | 'RT') => {
  setCookie(null, tokenKey, tokenValue, {
    maxAge: type === 'AT' ? 30 * 60 : 30 * 24 * 60 * 60, // AT는 30분 RT는 30일 유지
    path: '/', // 쿠키가 적용되는 URL 경로 (이 경우, 모든 페이지에서 쿠키 접근 가능)
    // httpOnly: true, // httpOnly는 서버 사이드에서 관리할 경우만 사용
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
