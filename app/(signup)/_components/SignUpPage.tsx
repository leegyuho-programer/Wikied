import Link from 'next/link';
import SignUpForm from '../../../components/Form/SignUpForm';
import styles from './SignUpPage.module.css';

function SignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>회원가입</p>
        <SignUpForm />
        <div className={styles.text}>
          <p>이미 회원이신가요?</p>
          <Link href="/login" className={styles.link}>
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
