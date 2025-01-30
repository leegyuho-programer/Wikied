import NavBarProfileSVGIcon from './NavBarProfileIcon.svg';
import styles from './NavBarProfileIcon.module.css';

interface Props {
  onClick: () => void;
  color?: string;
}

export default function NavBarProfileIcon({ onClick, color = '#C6CADA' }: Props) {
  return <NavBarProfileSVGIcon className={styles.icon} onClick={onClick} fill={color} />;
}
