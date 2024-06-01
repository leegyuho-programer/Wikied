'use client';

import { PropsWithChildren, ReactNode } from 'react';
import CloseIcon from '../../SvgComponents/CloseIcon/CloseIcon';
import { useRouter } from 'next/navigation';
import styles from './ModalContainer.module.css';
import Button from '../../Button/Button';

interface Props {
  children: ReactNode;
  type: string;
}

function ModalContainer({ children, type }: Props) {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  console.log(type);

  return (
    <div className={`${styles.container} ${styles.type}`}>
      <div className={styles.IconWrapper}>
        <CloseIcon onClick={onClickClose} />
      </div>
      {children}
      <div className={styles.button}>
        <Button isLink={false} variant="primary" isLittle={true}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default ModalContainer;

//타입에 따라 다르게 하기!?
