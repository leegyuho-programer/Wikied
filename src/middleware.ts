import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 인증이 필요한 경로들을 정의
const PROTECTED_PATHS = ['/myAccount', '/mypage', '/posting', '/userEdit', '/articleEdit'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRefreshToken = request.cookies.get('userRefreshToken')?.value;

  // PROTECTED_PATHS 중 하나로 시작하는 모든 경로에 대해 인증 체크
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !userRefreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher를 사용하여 미들웨어가 실행될 경로를 지정
  matcher: ['/myAccount/:path*', '/mypage/:path*', '/posting/:path*', '/userEdit/:path*', '/articleEdit/:path*'],
};
