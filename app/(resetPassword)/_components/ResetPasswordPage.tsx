import Link from 'next/link';
import ResetPasswordForm from '../../../components/Form/ResetPasswordForm';
import styles from './ResetPasswordPage.module.css';

function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.title}>비밀번호 재설정</p>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
