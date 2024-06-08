import Image from 'next/image';
import styles from './NavBar.module.css';
import Link from 'next/link';
import MenuIcon from '../SvgComponents/MenuIcon';
import Button from '../Button/Button';
import Gnb from './Gnb';

function NavBar() {
  return (
    <div className={styles.container}>
      <Gnb />
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
    </div>
  );
}

export default NavBar;
