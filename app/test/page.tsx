import Input from './../../components/Input/Input';
import NavBar from './../../components/NavBar/NavBar';
import Button from './../../components/Button/Button';
import styles from './page.module.css';

function Test() {
  return (
    <div className={styles.container}>
      <Input name="ID" label="이름" type="text" placeholder="하하" />
      <NavBar />
      <Button isLink={true} variant="primary" destination="/" isLittle={true}>
        안녕
      </Button>
      <Button isLink={false} variant="secondary" isLittle={true}>
        로그인
      </Button>
    </div>
  );
}

export default Test;
