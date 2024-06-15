'use client';

import { useRouter } from 'next/navigation';
import styles from './Card.module.css';
import Image from 'next/image';
import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';

interface CardProps {
  id: number;
  title: string;
  image: string;
  writerName: string;
  createdAt: string;
  likeCount: number;
}

export default function Card({ id, title, image, writerName, createdAt, likeCount }: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/article/${id}`); // articleId를 기반으로 페이지 이동
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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
