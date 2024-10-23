import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';

// 인증이 필요한 경로들을 정의
const PROTECTED_PATHS = ['/myAccount', '/mypage', '/posting', '/userEdit', '/articleEdit'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const userRefreshToken = request.cookies.get('userRefreshToken');
  const userRefreshToken = request.cookies.get('userRefreshToken')?.value;

  // PROTECTED_PATHS 중 하나로 시작하는 모든 경로에 대해 인증 체크
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !userRefreshToken) {
    // 현재 URL을 redirect_to 파라미터로 포함시켜서 로그인 후 원래 페이지로 돌아올 수 있게 함
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher를 사용하여 미들웨어가 실행될 경로를 지정
  matcher: ['/myAccount/:path*', '/mypage/:path*', '/posting/:path*', '/userEdit/:path*', '/articleEdit/:path*'],
};
