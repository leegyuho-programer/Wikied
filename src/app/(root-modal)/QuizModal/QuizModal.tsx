'use client';

import ModalBody from '../_components/ModalBody/ModalBody';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import ModalHeader from '../_components/ModalHeader/ModalHeader';
import ModalForm from '../_components/ModalForm/ModalForm';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input/Input';
import { quizModalRules } from '@/constants/inputErrorRules';
import styles from './QuizModal.module.css';
import Button from '@/components/Button/Button';
import { useStore } from '@/store';

export default function QuizModal() {
  const clearModal = useStore((state) => state.clearModal);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleQuiz = () => {
    console.log(11111);
  };

  return (
    <ModalContainer type="form" text="확인">
      <ModalHeader type="" />
      <p className={styles.question}>질문 불러오기</p>
      <form onSubmit={handleSubmit(handleQuiz)} className={styles.form}>
        <Input
          name="securityAnswer"
          placeholder="답안을 입력해 주세요."
          register={register('securityAnswer', quizModalRules)}
          errors={errors}
          classname={styles.input}
        />
        <Button isLink={false} variant="primary" classname={styles.button} onClick={clearModal}>
          확인
        </Button>
      </form>
      <p className={styles.explain}>
        위키드는 지인들과 함께하는 즐거운 공간입니다.
        <br />
        지인에게 상처를 주지 않도록 적성해 주세요.
      </p>
    </ModalContainer>
  );
}
