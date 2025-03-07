import { failModify, successCopy } from '@/constants/SnackBarMessage';
import styles from './SnackBar.module.css';
import Image from 'next/image';

interface Props {
  type: string;
}

function SnackBar({ type }: Props) {
  return (
    <div className={`${styles.container} ${type ? styles.successContainer : styles.failContainer}`}>
      {type ? (
        <Image src="/icons/SuccessIcon.svg" width={20} height={20} alt="SuccessIcon" />
      ) : (
        <Image src="/icons/FailIcon.svg" width={20} height={20} alt="FailIcon" />
      )}
      {type ? successCopy : failModify}
    </div>
  );
}

export default SnackBar;
