import NavBarProfileSVGIcon from './NavBarProfileIcon.svg';
import styles from './NavBarProfileIcon.module.css';

interface Props {
  onClick: () => void;
}

export default function NavBarProfileIcon({ onClick }: Props) {
  return <NavBarProfileSVGIcon className={styles.icon} onClick={onClick} />;
}
