'use client';

import { CONTENT, HEADER } from '@/constants/ModalText';
import styles from './ModalBody.module.css';
import { useRouter } from 'next/navigation';

function ModalBody() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{HEADER.timeOver}</h1>
      <p className={styles.content}>{CONTENT.timeOver}</p>
      <div className={styles.buttonWrapper}>
        <button onClick={() => router.back()} className={styles.button}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ModalBody;
