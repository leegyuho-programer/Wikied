'use client';

import Button from '@/components/Button/Button';
import LinkButton from '@/components/Button/LinkButton';
import { useStore } from '@/store';
import ModalBody from '../_components/ModalBody/ModalBody';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import ModalHeader from '../_components/ModalHeader/ModalHeader';
import styles from './WelcomeModal.module.css';

interface Props {
  onClose?: () => void;
}

export default function WelcomeModal({ onClose }: Props) {
  const hideModal = useStore((state) => state.hideModal);

  const handleClose = () => {
    hideModal('welcome');
    onClose?.();
  };

  return (
    <ModalContainer type="welcome" showCloseIcon={false}>
      <ModalHeader text="위키드에 오신 것을 환영합니다! 🎉" type="welcome" />
      <ModalBody>
        <div className={styles.container}>
          <p className={styles.text}>
            회원가입이 완료되었습니다!
            <br />
            이제 나만의 위키를 만들기 위한 마지막 단계만 남았습니다.
            <br />
            <br />
            질문과 답변을 설정하면, 친구들이 당신의 위키를 함께 작성할 수 있게 됩니다.
            <br />
            <br />
            지금 바로 설정하시겠습니까?
          </p>
          <div className={styles.buttonContainer}>
            <Button variant="secondary" onClick={handleClose} size="S">
              나중에 하기
            </Button>
            <LinkButton destination="/myAccount" variant="primary" size="S">
              지금 설정하기
            </LinkButton>
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
}
