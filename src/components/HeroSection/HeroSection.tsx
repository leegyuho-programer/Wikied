import LinkButton from '@/components/Button/LinkButton';
import { LANDING_IMAGES } from '@/constants/LandingImages';
import Image from 'next/image';
import styles from '../../app/Home.module.css';

export default function HeroSection() {
  return (
    <>
      <p className={styles.title}>
        남들이 만드는
        <br />
        <span className={styles.titleHighlight}>나만의 위키</span>
      </p>
      <div className={styles.buttonContainer}>
        <LinkButton destination="/mypage" variant="gray" size="M">
          위키 만들기
        </LinkButton>
      </div>
      <div className={styles.imageContainer1}>
        <Image src={LANDING_IMAGES.hero} alt="위키 예시 이미지" fill style={{ objectFit: 'cover' }} priority />
      </div>
      <div className={styles.circleBackground} />
    </>
  );
}
