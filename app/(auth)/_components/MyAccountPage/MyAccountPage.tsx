'use client';

import { useForm } from 'react-hook-form';
import Input from '../../../../components/Input/Input';
import styles from './MyAccountPage.module.css';
import Button from '../../../../components/Button/Button';
import DropDown from '../../../../components/DropDown/DropDown';
import StrokeIcon from '../../../../components/SvgComponents/StrokeIcon/StrokeIcon';

function MyAccountPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    console.log('login', data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>계정 설정</h1>
      <div>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="비밀번호 변경"
            placeholder="기존 비밀번호"
            label="비밀번호 변경"
            register={register}
            errors={errors}
          />
          <Input name="새 비밀번호" placeholder="새 비밀번호" register={register} errors={errors} />
          <Input name="새 비밀번호 확인" placeholder="새 비밀번호 확인" register={register} errors={errors} />
          <div className={styles.buttonWrapper}>
            <Button isLink={false} type="submit" size="XS" variant="primary">
              변경하기
            </Button>
          </div>
        </form>
      </div>
      <StrokeIcon />
      <div>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <p>위키 인증하기</p>
          {/* 드롭다운 질문 있으면 input 생기도록 하기 useState로 상태관리하면 될듯? */}
          <DropDown />
          <div className={styles.buttonWrapper}>
            <Button isLink={false} type="submit" size="XS" variant="primary">
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyAccountPage;
