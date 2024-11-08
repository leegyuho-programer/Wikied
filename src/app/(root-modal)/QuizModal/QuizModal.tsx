'use client';

import { getProfileCode } from '@/api/profile/profileCode';
import { postProfilePing } from '@/api/profile/profilePing';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { quizModalRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import ModalHeader from '../_components/ModalHeader/ModalHeader';
import styles from './QuizModal.module.css';

interface Props {
  codeId: string | null | undefined;
}

interface FormValues {
  securityAnswer: string;
}

export default function QuizModal({ codeId }: Props) {
  const { setSecurityQuestion, securityQuestion } = useStore((state: any) => ({
    setSecurityQuestion: state.setSecurityQuestion,
    securityQuestion: state.securityQuestion,
  }));

  const router = useRouter();
  const clearModal = useStore((state) => state.clearModal);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const handleQuiz = async (data: FormValues) => {
    try {
      const response = await postProfilePing({ securityAnswer: data.securityAnswer }, codeId as string);

      router.push('/userEdit');
      clearModal();
    } catch (error) {
      console.error('프로필 핑 전송 중 오류 발생:', error);
      setError('securityAnswer', {
        type: 'manual',
        message: '보안 답변이 잘못되었습니다. 다시 시도해 주세요.',
      });
    }
  };

  useEffect(() => {
    if (codeId) {
      getProfileCode(codeId)
        .then((response) => {
          setSecurityQuestion(response.securityQuestion);
        })
        .catch((error) => {
          console.error('프로필 코드 가져오기 오류:', error);
        });
    }
  }, [codeId]);

  return (
    <ModalContainer type="quiz">
      <ModalHeader type="quiz" />
      <p className={styles.question}>{securityQuestion}</p>
      <form onSubmit={handleSubmit(handleQuiz)} className={styles.form}>
        <Input
          name="securityAnswer"
          placeholder="답안을 입력해 주세요."
          register={register('securityAnswer', quizModalRules)}
          errors={errors}
          classname={styles.input}
        />
        <Button type="submit" variant="primary" classname={styles.button}>
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
