import Link from 'next/link';
import Form from '../../../components/Form/Form';
import styles from './SignUpPage.module.css';

interface Props {
  type: 'signup' | 'login';
}

function SignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>회원가입</p>
        <Form type="signup" />
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
