import { LANDING_IMAGES } from '@/constants/LandingImages';
import Image from 'next/image';
import styles from '../../app/Home.module.css';

export default function ShareSection() {
  return (
    <>
      <div className={styles.middleSection}>
        <div className={`${styles.section} ${styles.sectionRight}`}>
          <h3 className={styles.sectionTitle}>SHARE</h3>
          <p className={`${styles.sectionContent} ${styles.content}`}>
            내 위키 만들고
            <br />
            친구에게 공유해요
          </p>
        </div>
      </div>
      <div className={styles.imageContainerWrapper}>
        <div className={styles.imageContainer8} />
        {[
          { src: LANDING_IMAGES.megaphone, alt: '확성기 이미지', container: styles.imageContainer4 },
          {
            src: LANDING_IMAGES.wLogo,
            alt: 'W 로고 이미지',
            container: `${styles.imageContainer5} ${styles.imageContainer4}`,
          },
          {
            src: LANDING_IMAGES.share,
            alt: '공유 이미지',
            container: `${styles.imageContainer6} ${styles.imageContainer4}`,
          },
          {
            src: LANDING_IMAGES.message,
            alt: '메시지 이미지',
            container: `${styles.imageContainer6} ${styles.imageContainer4}`,
          },
        ].map((image, index) => (
          <div key={index} className={image.container}>
            <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
        <div className={styles.imageContainer7} />
      </div>
    </>
  );
}
