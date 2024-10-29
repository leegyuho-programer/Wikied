'use client';

import { useRouter } from 'next/navigation';
import ModalBody from '../_components/ModalBody/ModalBody';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import styles from './OverTimeModal.module.css';
import { CONTENT, HEADER } from '@/constants/ModalText';
import Button from '@/components/Button/Button';

export default function OverTimeModal() {
  const router = useRouter();

  return (
    <div>
      <ModalContainer type="overTime" text="확인" showCloseIcon={false}>
        <ModalBody>
          <h1 className={styles.header}>{HEADER.timeOver}</h1>
          <p className={styles.content}>{CONTENT.timeOver}</p>
          <div className={styles.buttonWrapper}>
            <Button onClick={() => router.back()} size="XS" variant="primary">
              확인
            </Button>
          </div>
        </ModalBody>
      </ModalContainer>
    </div>
  );
}
