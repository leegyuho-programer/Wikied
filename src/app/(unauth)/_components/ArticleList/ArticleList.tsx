import { useRouter } from 'next/navigation';
import LineStrokeIcon from '@/components/SvgComponents/StrokeIcon/LineStroke';
import styles from './ArticleList.module.css';
import { formatDate } from '@/utils/day';

export interface ArticleListProps {
  id: number;
  title: string;
  writerName: string;
  likeCount: number;
  createdAt: string;
}

export default function ArticleList({ id, title, writerName, likeCount, createdAt }: ArticleListProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/article/${id}`);
  };

  return (
    <div className={styles.articleList} onClick={handleClick}>
      <div className={styles.top}>
        <div className={styles.id}>{id}</div>
        <div className={styles.articleTitle}>{title}</div>
        <p className={styles.articleWriter}>{writerName}</p>
        <div className={styles.like}>{likeCount}</div>
        <p className={styles.day}>{formatDate(createdAt)}</p>
      </div>
      <LineStrokeIcon />
    </div>
  );
}
