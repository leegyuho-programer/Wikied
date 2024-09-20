import { failModify, successCopy } from '@/constants/SnackBarMassage';
import FailIcon from '../SvgComponents/FailIcon/FailIcon';
import SuccessIcon from '../SvgComponents/SuccessIcon/SuccessIcon';
import styles from './SnackBar.module.css';

interface Props {
  type: string;
}

function SnackBar({ type }: Props) {
  return (
    <div className={`${styles.container} ${type ? styles.successContainer : styles.failContainer}`}>
      {type ? <SuccessIcon /> : <FailIcon />}
      {type ? successCopy : failModify}
    </div>
  );
}

export default SnackBar;
