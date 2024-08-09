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
