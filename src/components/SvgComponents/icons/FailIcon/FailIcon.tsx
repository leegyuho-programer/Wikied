import FailSVGIcon from './FailIcon.svg';
import styles from './FailIcon.module.css';

interface Props {
  color?: string;
}

export default function FailIcon({ color = '#D14343' }: Props) {
  return <FailSVGIcon className={styles.container} fill={color} />;
}
