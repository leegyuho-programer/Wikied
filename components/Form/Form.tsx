import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';

function Form() {
  return (
    <form className={styles.container}>
      <Input name="이름" placeholder="이름을 입력해 주세요." label="이름" />
      <Input name="이메일" placeholder="이메일을 입력해 주세요." label="이메일" />
      <Input name="비밀번호" placeholder="비밀번호를 입력해 주세요." label="비밀번호" />
      <Input name="비밀번호 확인" placeholder="비밀번호를 입력해 주세요." label="비밀번호 확인" />
      <Button isLink={false}>다음</Button>
    </form>
  );
}

export default Form;
