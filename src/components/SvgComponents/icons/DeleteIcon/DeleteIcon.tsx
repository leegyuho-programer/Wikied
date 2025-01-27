import DeleteSVGIcon from './DeleteIcon.svg';
import styles from './DeleteIcon.module.css';

interface Props {
  onClick: () => void;
}

export default function DeleteIcon({ onClick }: Props) {
  return <DeleteSVGIcon className={styles.icon} onClick={onClick} />;
}
