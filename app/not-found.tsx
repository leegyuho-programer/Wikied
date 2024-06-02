import Image from 'next/image';
import styles from './not-found.module.css';
import Button from '../components/Button/Button';
import notFound from '../public/images/notFound.png';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={notFound} alt="Not-Found Image" placeholder="blur" layout="fill" objectFit="cover" />
      </div>
      <p className={styles.text}>해당 페이지를 찾을 수 없어요.</p>
      <Button isLink={true} destination="/" isLittle={true}>
        홈으로 가기
      </Button>
    </div>
  );
}

export default NotFound;
