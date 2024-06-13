// import HeartIcon from '../../../../components/SvgComponents/HeartIcon/HeartIcon';
// import styles from './Card.module.css';

// export default function Card() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.image}>이미지</div>
//       <div className={styles.content}>
//         <h1 className={styles.title}>게시물 제목입니다.</h1>
//         <div className={styles.body}>
//           <div className={styles.user}>
//             <p>박동욱</p>
//             <p>2024.02.24</p>
//           </div>
//           <div className={styles.like}>
//             <HeartIcon />
//             <p>130</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
        <Image src={image} alt={title} width={200} height={200} />
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
