import { LANDING_IMAGES } from '@/constants/LandingImages';
import Image from 'next/image';
import styles from '../../app/Home.module.css';

export default function WriteSection() {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionWrapper}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>WRITE</h3>
          <p className={styles.sectionContent}>
            친구의 위키,
            <br />
            직접 작성해 봐요
          </p>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer2}>
              <Image src={LANDING_IMAGES.write} alt="위키 작성 예시" fill style={{ objectFit: 'cover' }} priority />
            </div>
          </div>
        </div>
        <div className={styles.imageContainer3}>
          <Image
            src={LANDING_IMAGES.writeExample}
            alt="위키 작성 화면 예시"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
