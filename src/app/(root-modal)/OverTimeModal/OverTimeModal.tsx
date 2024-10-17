import ModalBody from '../_components/ModalBody/ModalBody';
import ModalContainer from '../_components/ModalContainer/ModalContainer';

export default function OverTimeModal() {
  return (
    <div>
      <ModalContainer type="form" text="확인" showCloseIcon={false}>
        <ModalBody />
      </ModalContainer>
    </div>
  );
}
