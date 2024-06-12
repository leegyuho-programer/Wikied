import Button from '../../../../components/Button/Button';
import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
import ArticleStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/ArticleStrokeIcon';
import styles from './Article.module.css';

export default function Article() {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시물 제목입니다.</h1>
          <Button variant="primary" isLink={true} destination="/" size="S">
            수정하기
          </Button>
        </div>
        <div className={styles.content}>
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
      <ArticleStrokeIcon />
      <div>내용들</div>
    </div>
  );
}
