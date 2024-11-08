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
  showCloseIcon?: boolean;
  disableBackgroundClose?: boolean;
  onClick?: () => void;
}

function ModalContainer({ children, type, showCloseIcon = true, disableBackgroundClose = false, onClick }: Props) {
  const hideModal = useStore((state) => state.hideModal);
  const containerClass = `${styles.container} ${type ? styles[type] : ''}`;

  const handleModalClose = () => {
    if (!type) return;

    // 외부에서 전달받은 onClick이 있으면 그것을 사용
    if (onClick) {
      onClick();
      return;
    }

    // 없으면 기본 동작 수행
    switch (type) {
      case 'welcome':
        hideModal('welcome');
        break;
      case 'quiz':
        hideModal('quiz');
        break;
      default:
        console.warn('Unhandled modal type:', type);
        break;
    }
  };

  const handleBackgroundClick = () => {
    if (disableBackgroundClose) return;
    handleModalClose();
  };

  return (
    <ModalPortal>
      <div className={styles.containerWrapper} onClick={handleBackgroundClick}>
        <div className={containerClass} onClick={(e) => e.stopPropagation()}>
          {showCloseIcon && (
            <div className={styles.IconWrapper}>
              <CloseIcon onClick={handleModalClose} />
            </div>
          )}
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default ModalContainer;
