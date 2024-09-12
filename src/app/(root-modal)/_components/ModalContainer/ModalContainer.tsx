'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './ModalContainer.module.css';
import Button from '@/components/Button/Button';
import CloseIcon from '@/components/SvgComponents/CloseIcon/CloseIcon';
import { useStore } from '@/store';
import ModalPortal from '../../ModalPortal';

type TitleType = 'alert' | 'form' | 'quiz';
interface Props {
  children: ReactNode;
  type?: string;
  text: string;
}

function ModalContainer({ children, type, text }: Props) {
  const clearModal = useStore((state) => state.clearModal);

  return (
    <div className={styles.containerWrapper}>
      <div className={`${styles.container} ${styles.type}`}>
        <div className={styles.IconWrapper}>
          <CloseIcon onClick={clearModal} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
