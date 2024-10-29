import LockIcon from '../../../../components/SvgComponents/LockIcon';
import styles from './ModalHeader.module.css';

interface Props {
  text?: string;
  type: string;
}

function ModalHeader({ text, type }: Props) {
  return type === 'quiz' ? (
    <div className={styles.header}>
      <div className={styles.icon}>
        <LockIcon />
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
