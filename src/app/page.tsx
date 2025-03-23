import LinkButton from '@/components/Button/LinkButton';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';

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
          <LinkButton destination="/mypage" variant="gray" size="M">
            위키 만들기
          </LinkButton>
        </div>
        <div className={styles.imageContainer1}>
          <Image src="/images/landing1.png" alt="예시 이미지" fill style={{ objectFit: 'cover' }} priority />
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
                  <Image src="/images/landing2.png" alt="예시 이미지" fill style={{ objectFit: 'cover' }} priority />
                </div>
              </div>
            </div>
            <div className={styles.imageContainer3}>
              <Image src="/images/landing3.png" alt="예시 이미지" fill style={{ objectFit: 'cover' }} priority />
            </div>
          </div>
        </div>
      </div>
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
        <div className={styles.imageContainer8}></div>
        <div className={styles.imageContainer4}>
          <Image src="/images/landing4.png" alt="확성기 이미지" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={`${styles.imageContainer5} ${styles.imageContainer4}`}>
          <Image src="/images/landing5.png" alt="W 이미지" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={`${styles.imageContainer6} ${styles.imageContainer4}`}>
          <Image src="/images/landing6.png" alt="공유 이미지" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={`${styles.imageContainer6} ${styles.imageContainer4}`}>
          <Image src="/images/landing7.png" alt="메세지 이미지" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.imageContainer7}></div>
      </div>
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
            <Image src="/images/landing8.png" alt="예시 이미지" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.imageContainer10}>
              <Image src="/images/landing9.png" alt="종 이미지" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.imageContainer11}>
              <Image src="/images/landing10.png" alt="예시 이미지" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lastSection}>
        <p className={styles.lastTitle}>나만의 위키 만들어 보기</p>
        <LinkButton destination="/mypage" variant="white" size="M">
          지금 시작하기
        </LinkButton>
      </div>
      <div className={styles.footerContainer}>
        <p className={styles.copyright}>Copyright ⓒ Wikied. All Rights Reserved</p>
        <p className={styles.address}>
          사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은
          <br />
          서울특별시 중구 청계천로 123, 위키드빌딩
        </p>
        <div className={styles.link}>
          <Link href="/" className={styles.font}>
            서비스 이용약관
          </Link>
          <Link href="/" className={styles.font}>
            개인정보 취급방침
          </Link>
          <Link href="/" className={styles.font}>
            전자금융거래 기본약관
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
