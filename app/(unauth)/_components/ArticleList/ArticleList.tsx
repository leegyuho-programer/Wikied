import LineStrokeIcon from '../../../../components/SvgComponents/StrokeIcon/LineStroke';
import styles from './ArticleList.module.css';

export interface CardProps {
  title: string;
  id: number;
  writerName: string;
  createdAt: string;
  likeCount: number;
}

export default function ArticleList({ id, title, writerName, likeCount, createdAt }: CardProps) {
  return (
    <div className={styles.articleList}>
      <div className={styles.top}>
        <div className={styles.id}>{id}</div>
        <div className={styles.articleTitle}>{title}</div>
        <p className={styles.articleWriter}>{writerName}</p>
        <div className={styles.like}>{likeCount}</div>
        <p className={styles.day}>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <LineStrokeIcon />
    </div>
  );
}
