import ModalBody from '../_components/ModalBody/ModalBody';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import ModalHeader from '../_components/ModalHeader/ModalHeader';
import ModalForm from '../_components/ModalForm/ModalForm';

export default function QuizModal() {
  return (
    <div>
      <ModalContainer type="form" text="확인">
        <ModalHeader type="" />
        <ModalForm />
      </ModalContainer>
    </div>
  );
}
