import Image from 'next/image';
import Link from 'next/link';
import styles from './Gnb.module.css';

function Gnb() {
  return (
    <div className={styles.gnbs}>
      <Link href="/">
        <Image src="/images/logo.png" alt="로고 이미지" width={107} height={30} loading="eager" priority={true} />
      </Link>
      <Link href="/wikilist" className={styles.gnb}>
        위키목록
      </Link>
      <Link href="/freeBoard" className={styles.gnb}>
        자유게시판
      </Link>
    </div>
  );
}

export default Gnb;
