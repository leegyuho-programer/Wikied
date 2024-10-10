import LinkButton from '@/components/Button/LinkButton.';
import Image from 'next/image';
import notFound from '../../public/images/notFound.png';
import styles from './not-found.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={notFound} alt="Not-Found Image" layout="fill" objectFit="cover" />
      </div>
      <p className={styles.text}>해당 페이지를 찾을 수 없어요.</p>
      <LinkButton destination="/" size="S" variant="primary">
        홈으로 가기
      </LinkButton>
    </div>
  );
}

export default NotFound;
