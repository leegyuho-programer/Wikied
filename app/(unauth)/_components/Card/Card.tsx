import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
import styles from './Card.module.css';

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>이미지</div>
      <div className={styles.content}>
        <h1 className={styles.title}>게시물 제목입니다.</h1>
        <div className={styles.body}>
          <div className={styles.user}>
            <p>박동욱</p>
            <p>2024.02.24</p>
          </div>
          <div className={styles.like}>
            <HeartIcon />
            <p>130</p>
          </div>
        </div>
      </div>
    </div>
  );
}
