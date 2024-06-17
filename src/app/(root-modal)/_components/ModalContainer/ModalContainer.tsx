'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import styles from './ModalContainer.module.css';
import Button from '@/components/Button/Button';
import CloseIcon from '@/components/SvgComponents/CloseIcon/CloseIcon';

type TitleType = 'alert' | 'form' | 'quiz';
interface Props {
  children: ReactNode;
  type?: string;
  text: string;
}

function ModalContainer({ children, type, text }: Props) {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };

  return (
    <div className={`${styles.container} ${styles.type}`}>
      <div className={styles.IconWrapper}>
        <CloseIcon onClick={onClickClose} />
      </div>
      {children}
      <div className={styles.button}>
        <Button isLink={false} variant="primary" size="XS">
          {text}
        </Button>
      </div>
    </div>
  );
}

export default ModalContainer;

//타입에 따라 다르게 하기!?
