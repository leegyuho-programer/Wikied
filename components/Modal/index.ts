import ModalBody from './ModalBody/ModalBody';
import { default as ModalContainer, default as ModalLayout } from './ModalContainer/ModalContainer';
import ModalHeader from './ModalHeader/ModalHeader';

const Modal = Object.assign(ModalLayout, {
  Container: ModalContainer,
  Header: ModalHeader,
  Body: ModalBody,
});

export default Modal;
