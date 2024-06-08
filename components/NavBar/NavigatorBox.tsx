import Link from 'next/link';
import Button from '../Button/Button';
import MenuIcon from '../SvgComponents/MenuIcon';
import styles from './NavigatorBox.module.css';

function NavigatorBox() {
  return (
    <>
      <div className={styles.status}>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
        <Button isLink={true} variant="primary" destination="/" size="S">
          내 위키 만들기
        </Button>
      </div>
      <div className={styles.dropdown}>
        <MenuIcon />
      </div>
    </>
  );
}

export default NavigatorBox;
