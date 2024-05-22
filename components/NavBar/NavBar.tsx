import Image from 'next/image';
import styles from './NavBar.module.css';
import Link from 'next/link';
import Menu from './../SvgComponents/Menu';

function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.gnb}>
        <Image src="/images/logo.png" alt="로고 이미지" width={107} height={30} />
        <Link href="/">위키목록</Link>
        <Link href="/">자유게시판</Link>
      </div>
      <div className={styles.status}>
        <Link href="/" className={styles.login}>
          로그인
        </Link>
        <button className={styles.button}>내 위키 만들기</button>
      </div>
      <div className={styles.dropdown}>
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
