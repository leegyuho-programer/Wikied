import Link from 'next/link';
import LoginForm from '@/components/Form/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>로그인</p>
        <LoginForm />
        <div className={styles.text}>
          <Link href="/resetPassword">비밀번호 재설정</Link>
          <Link href="/signup" className={styles.link}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
