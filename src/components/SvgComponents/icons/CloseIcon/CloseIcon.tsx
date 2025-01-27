import CloseSVGIcon from './CloseIcon.svg';
import styles from './CloseIcon.module.css';

interface Props {
  onClick: () => void;
}

export default function CloseIcon({ onClick }: Props) {
  return <CloseSVGIcon className={styles.container} onClick={onClick} />;
}
