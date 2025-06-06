import Link from 'next/link';
import styles from '../../app/Home.module.css';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.copyright}>Copyright ⓒ Wikied. All Rights Reserved</p>
      <p className={styles.address}>
        사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은
        <br />
        서울특별시 중구 청계천로 123, 위키드빌딩
      </p>
      <div className={styles.link}>
        {[
          { href: '/terms', text: '서비스 이용약관' },
          { href: '/privacy', text: '개인정보 취급방침' },
          { href: '/finance', text: '전자금융거래 기본약관' },
        ].map((link, index) => (
          <Link key={index} href={link.href} className={styles.font}>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
