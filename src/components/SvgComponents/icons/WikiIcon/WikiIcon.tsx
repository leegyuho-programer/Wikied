import WikiSVGIcon from './WikiIcon.svg';
import styles from './WikiIcon.module.css';

interface Props {
  color?: string;
}

export default function WikiIcon({ color = '#C6CADA' }: Props) {
  return <WikiSVGIcon className={styles.icon} fill={color} />;
}
