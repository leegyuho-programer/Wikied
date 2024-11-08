// import Link from 'next/link';
// import LoginForm from '@/components/Form/LoginForm';
// import styles from './LoginPage.module.css';

// function LoginPage() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         <p className={styles.title}>로그인</p>
//         <LoginForm />
//         <div className={styles.text}>
//           <p>회원이 아니신가요?</p>
//           <Link href="/signup" className={styles.link}>
//             회원가입하기
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import LoginForm from '@/components/Form/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const refreshToken = cookies.userRefreshToken;
    const userAuth = typeof window !== 'undefined' ? window.localStorage.getItem('store') : null;

    if (refreshToken && userAuth) {
      // URL에서 redirect_to 파라미터 가져오기
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get('redirect_to');

      // 리다이렉트 경로가 있으면 해당 경로로, 없으면 /mypage로 이동
      router.replace(redirectTo ? decodeURIComponent(redirectTo) : '/mypage');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>로그인</p>
        <LoginForm />
        <div className={styles.text}>
          <p>회원이 아니신가요?</p>
          <Link href="/signup" className={styles.link}>
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
