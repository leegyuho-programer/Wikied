import CloseSVGIcon from './CloseIcon.svg';
import styles from './CloseIcon.module.css';

interface Props {
  onClick: () => void;
  color?: string;
}

export default function CloseIcon({ onClick, color = '#8F95B2' }: Props) {
  return <CloseSVGIcon className={styles.container} onClick={onClick} fill={color} />;
}
