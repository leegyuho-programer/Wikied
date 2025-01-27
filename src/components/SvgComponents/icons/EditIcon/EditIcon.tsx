import EditSVGIcon from './EditIcon.svg';
import styles from './EditIcon.module.css';

interface Props {
  onClick: () => void;
}

export default function EditIcon({ onClick }: Props) {
  return <EditSVGIcon className={styles.icon} onClick={onClick} />;
}
