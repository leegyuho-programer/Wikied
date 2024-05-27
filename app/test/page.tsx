import Input from './../../components/Input/Input';
import NavBar from './../../components/NavBar/NavBar';
import Button from './../../components/Button/Button';
import styles from './page.module.css';
import SideBar from '../../components/SideBar/SideBar';
import DropDown from '../../components/DropDown/DropDown';
import Menu from '../../components/Menu/Menu';
import Link from '../../components/Link/Link';
import SnackBar from '../../components/SnackBar/SnackBar';
import SearchBar from '../../components/SearchBar/SearchBar';

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
      <DropDown />
      <Menu />
      <Link />
      <SnackBar type="true" />
      <SearchBar />
    </div>
  );
}

export default Test;
