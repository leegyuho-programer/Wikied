import Form from '../../../components/Form/Form';
import styles from './SignUpPage.module.css';

interface Props {
  type: 'signup' | 'login';
}

function SignUpPage({ type }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>회원가입</p>
        <Form type="login" />
        <p>이미 회원이신가요? 로그인하기</p>
      </div>
    </div>
  );
}

export default SignUpPage;
