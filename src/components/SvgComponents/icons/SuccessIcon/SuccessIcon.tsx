import SuccessSVGIcon from './SuccessIcon.svg';
import styles from './SuccessIcon.module.css';

interface Props {
  color?: string;
}

export default function SuccessIcon({ color = '#4CBFA4' }: Props) {
  return <SuccessSVGIcon className={styles.container} fill={color} />;
}
