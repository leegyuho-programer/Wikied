import LinkButton from '../Button/LinkButton';
import styles from '../../app/Home.module.css';

export default function CallToActionSection() {
  return (
    <div className={styles.lastSection}>
      <p className={styles.lastTitle}>나만의 위키 만들어 보기</p>
      <LinkButton destination="/mypage" variant="white" size="M">
        지금 시작하기
      </LinkButton>
    </div>
  );
}
