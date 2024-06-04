import Link from 'next/link';
import Form from '../../../components/Form/Form';
import styles from './ResetPasswordPage.module.css';

function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>비밀번호 재설정</p>
        <Form type="resetPassword" />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
