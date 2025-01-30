import DeleteSVGIcon from './DeleteIcon.svg';
import styles from './DeleteIcon.module.css';

interface Props {
  onClick: () => void;
  color?: string;
}

export default function DeleteIcon({ onClick, color = '#8F95B2' }: Props) {
  return <DeleteSVGIcon className={styles.icon} onClick={onClick} fill={color} />;
}
