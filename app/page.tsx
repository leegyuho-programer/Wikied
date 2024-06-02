import Image from 'next/image';
import Button from '../components/Button/Button';
import Image1 from '../public/images/landing1.png';
import Image2 from '../public/images/landing2.png';
import Image3 from '../public/images/landing3.png';
import Image4 from '../public/images/landing4.png';
import Image5 from '../public/images/landing5.png';
import Image6 from '../public/images/landing6.png';
import Image7 from '../public/images/landing7.png';
import styles from './page.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>
          남들이 만드는
          <br />
          <span className={styles.titleHighlight}>나만의 위키</span>
        </p>
        <div className={styles.buttonContainer}>
          <Button isLink={true} destination="/" isMedium={true} variant="gray">
            위키 만들기
          </Button>
        </div>
        <div className={styles.imageContainer1}>
          <Image src={Image1} alt="예시 이미지" placeholder="blur" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.circleBackground}></div>
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
                  <Image src={Image2} alt="예시 이미지" placeholder="blur" layout="fill" objectFit="cover" />
                </div>
              </div>
            </div>
            <div className={styles.imageContainer3}>
              <Image src={Image3} alt="예시 이미지" placeholder="blur" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.sectionRight}`}>
        <h3 className={styles.sectionTitle}>SHARE</h3>
        <p className={`${styles.sectionContent} ${styles.content}`}>
          내 위키 만들고
          <br />
          친구에게 공유해요
        </p>
      </div>
      <div className={styles.imageContainerWrapper}>
        <div className={styles.imageContainer8}></div>
        <div className={styles.imageContainer4}>
          <Image src={Image4} alt="확성기 이미지" placeholder="blur" layout="fill" objectFit="cover" />
        </div>
        <div className={`${styles.imageContainer5} ${styles.imageContainer4}`}>
          <Image src={Image5} alt="W 이미지" placeholder="blur" layout="fill" objectFit="cover" />
        </div>
        <div className={`${styles.imageContainer6} ${styles.imageContainer4}`}>
          <Image src={Image6} alt="공유 이미지" placeholder="blur" layout="fill" objectFit="cover" />
        </div>
        <div className={`${styles.imageContainer6} ${styles.imageContainer4}`}>
          <Image src={Image7} alt="메세지 이미지" placeholder="blur" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.imageContainer7}></div>
      </div>
    </div>
  );
}

export default Home;
