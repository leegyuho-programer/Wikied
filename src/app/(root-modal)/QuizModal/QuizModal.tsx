// 'use client';

// import Button from '@/components/Button/Button';
// import Input from '@/components/Input/Input';
// import { quizModalRules } from '@/constants/inputErrorRules';
// import { useStore } from '@/store';
// import { useForm } from 'react-hook-form';
// import ModalContainer from '../_components/ModalContainer/ModalContainer';
// import ModalHeader from '../_components/ModalHeader/ModalHeader';
// import styles from './QuizModal.module.css';
// import { useRouter } from 'next/navigation';
// import { postProfilePing } from '@/api/profile/profilePing';

// interface Props {
//   codeId: string | null;
// }

// interface FormValues {
//   securityAnswer: string;
// }

// export default function QuizModal({ codeId }: Props) {
//   const accessToken = useStore((state) => state.userAccessToken);
//   const router = useRouter();
//   const clearModal = useStore((state) => state.clearModal);
//   const securityQuestion = useStore((state) => state.securityQuestion);
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     setError,
//   } = useForm<FormValues>({ mode: 'onBlur' });

//   const handleQuiz = async (data: FormValues) => {
//     try {
//       console.log('Security Answer:', data.securityAnswer, 'Code ID:', codeId);
//       const response = await postProfilePing({ securityAnswer: data.securityAnswer }, codeId as string, accessToken);
//       console.log('response', response);
//       router.push('/userEdit');
//       clearModal();
//     } catch (error) {
//       console.error('프로필 핑 전송 중 오류 발생:', error);
//       setError('securityAnswer', {
//         type: 'manual',
//         message: '보안 답변이 잘못되었습니다. 다시 시도해 주세요.',
//       });
//     }
//   };

//   return (
//     <ModalContainer type="form" text="확인">
//       <ModalHeader type="" />
//       <p className={styles.question}>{securityQuestion}</p>
//       <form onSubmit={handleSubmit(handleQuiz)} className={styles.form}>
//         <Input
//           name="securityAnswer"
//           placeholder="답안을 입력해 주세요."
//           register={register('securityAnswer', quizModalRules)}
//           errors={errors}
//           classname={styles.input}
//         />
//         {errors.securityAnswer && <p className={styles.error}>{errors.securityAnswer.message}</p>}
//         <Button isLink={false} type="submit" variant="primary" classname={styles.button}>
//           확인
//         </Button>
//       </form>
//       <p className={styles.explain}>
//         위키드는 지인들과 함께하는 즐거운 공간입니다.
//         <br />
//         지인에게 상처를 주지 않도록 적성해 주세요.
//       </p>
//     </ModalContainer>
//   );
// }

'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { quizModalRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import ModalContainer from '../_components/ModalContainer/ModalContainer';
import ModalHeader from '../_components/ModalHeader/ModalHeader';
import styles from './QuizModal.module.css';
import { useRouter } from 'next/navigation';
import { postProfilePing } from '@/api/profile/profilePing';

interface Props {
  codeId: string | null;
}

interface FormValues {
  securityAnswer: string;
}

export default function QuizModal({ codeId }: Props) {
  const accessToken = useStore((state) => state.userAccessToken);
  const router = useRouter();
  const clearModal = useStore((state) => state.clearModal);
  const securityQuestion = useStore((state) => state.securityQuestion);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const handleQuiz = async (data: FormValues) => {
    try {
      console.log('Security Answer:', data.securityAnswer, 'Code ID:', codeId);
      const response = await postProfilePing({ securityAnswer: data.securityAnswer }, codeId as string, accessToken);
      console.log('response', response);
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

  return (
    <ModalContainer type="form" text="확인">
      <ModalHeader type="" />
      <p className={styles.question}>{securityQuestion}</p>
      <form onSubmit={handleSubmit(handleQuiz)} className={styles.form}>
        <Input
          name="securityAnswer"
          placeholder="답안을 입력해 주세요."
          register={register('securityAnswer', quizModalRules)}
          errors={errors}
          classname={styles.input}
        />
        {/* Remove the duplicate error message rendering here */}
        <Button isLink={false} type="submit" variant="primary" classname={styles.button}>
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
