import { LANDING_IMAGES } from '@/constants/LandingImages';
import Image from 'next/image';
import styles from '../../app/Home.module.css';

export default function ViewSection() {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.body}>
        <div className={`${styles.section} ${styles.sectionLeft}`}>
          <h3 className={styles.sectionTitle}>VIEW</h3>
          <p className={`${styles.sectionContent} ${styles.content}`}>
            친구들이 달아준
            <br />
            내용을 확인해 봐요
          </p>
        </div>
        <div className={styles.imageContainer9}>
          <Image src={LANDING_IMAGES.view} alt="위키 보기 예시" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.imageContainer10}>
            <Image src={LANDING_IMAGES.bell} alt="알림 종 이미지" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.imageContainer11}>
            <Image src={LANDING_IMAGES.viewExample} alt="위키 보기 화면 예시" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
