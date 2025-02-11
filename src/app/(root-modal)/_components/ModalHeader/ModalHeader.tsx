import styles from './ModalHeader.module.css';
import Image from 'next/image';

interface Props {
  text?: string;
  type: string;
}

function ModalHeader({ text, type }: Props) {
  return type === 'quiz' ? (
    <div className={styles.header}>
      <div className={styles.icon}>
        <Image src="/icons/LockIcon.svg" width={20} height={20} alt="LockIcon" />
      </div>
      <p className={styles.text}>
        다음 퀴즈를 맞추고
        <br />
        위키를 작성해 보세요.
      </p>
    </div>
  ) : (
    <h1 className={styles.container}>{text}</h1>
  );
}

export default ModalHeader;
