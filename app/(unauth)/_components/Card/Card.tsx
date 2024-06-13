import Image from 'next/image';
import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  image: string;
  writerName: string;
  createdAt: string;
  likeCount: number;
}

export default function Card({ title, image, writerName, createdAt, likeCount }: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.body}>
          <div className={styles.user}>
            <p>{writerName}</p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div className={styles.like}>
            <HeartIcon />
            <p>{likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
