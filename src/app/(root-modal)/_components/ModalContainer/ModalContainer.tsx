'use client';

import CloseIcon from '@/components/SvgComponents/CloseIcon/CloseIcon';
import { useStore } from '@/store';
import { modalType } from '@/store/zustand.types';
import { ReactNode } from 'react';
import styles from './ModalContainer.module.css';
import ModalPortal from '../../ModalPortal';

interface Props {
  children: ReactNode;
  type?: modalType;
  text: string;
  showCloseIcon?: boolean;
}

function ModalContainer({ children, type, text, showCloseIcon = true }: Props) {
  const clearModal = useStore((state) => state.clearModal);
  const containerClass = `${styles.container} ${type ? styles[type] : ''}`;

  return (
    <ModalPortal>
      <div className={styles.containerWrapper}>
        <div className={containerClass}>
          {showCloseIcon && (
            <div className={styles.IconWrapper}>
              <CloseIcon onClick={clearModal} />
            </div>
          )}
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default ModalContainer;
