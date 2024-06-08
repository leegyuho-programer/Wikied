import Input from './../../components/Input/Input';
import NavBar from './../../components/NavBar/NavBar';
import Button from './../../components/Button/Button';
import styles from './page.module.css';
import SideBar from '../../components/SideBar/SideBar';
import DropDown from '../../components/DropDown/DropDown';
import Menu from '../../components/Menu/Menu';
import LinkCopy from '../../components/LinkCopy/LinkCopy';
import SnackBar from '../../components/SnackBar/SnackBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Modal from '../../components/Modal';
import ModalContainer from '../../components/Modal/ModalContainer/ModalContainer';
import ModalHeader from '../../components/Modal/ModalHeader/ModalHeader';
import ModalBody from '../../components/Modal/ModalBody/ModalBody';

function Test() {
  return (
    <div className={styles.container}>
      {/* <Input name="ID" label="이름" type="text" placeholder="하하" />
      <NavBar />
      <Button isLink={true} variant="primary" destination="/" isLittle={true}>
        안녕
      </Button>
      <Button isLink={false} variant="secondary" isLittle={true}>
        로그인
      </Button>
      <SideBar /> */}
      {/* <DropDown />
      <Menu />
      <LinkCopy />
      <SnackBar type="true" /> */}
      {/* <Button isLink={false} variant="primary" isLittle={true}>
        로그인
      </Button> */}
      <SearchBar />
      {/* <ModalContainer type={type} text="확인"> */}
      <ModalContainer text="확인">
        <ModalHeader text="비디오" type="form" />
        <ModalBody />
      </ModalContainer>
      <ModalContainer text="확인">
        <ModalHeader type="quiz" />
        <ModalBody />
      </ModalContainer>
      <DropDown />
    </div>
  );
}

export default Test;
