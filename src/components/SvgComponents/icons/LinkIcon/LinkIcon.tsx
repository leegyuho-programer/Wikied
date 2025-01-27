import LinkSVGIcon from './LinkIcon.svg';
import styles from './LinkIcon.module.css';

interface Props {
  color?: string;
}

export default function LinkIcon({ color = '#4CBFA4' }: Props) {
  return <LinkSVGIcon className={styles.icon} fill={color} />;
}
