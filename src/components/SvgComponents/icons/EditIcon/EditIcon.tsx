import EditSVGIcon from './EditIcon.svg';
import styles from './EditIcon.module.css';

interface Props {
  onClick: () => void;
  color?: string;
}

export default function EditIcon({ onClick, color = '#8F95B2' }: Props) {
  return <EditSVGIcon className={styles.icon} onClick={onClick} fill={color} />;
}
