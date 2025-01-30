import HeartSVGIcon from './HeartIcon.svg';
import styles from './HeartIcon.module.css';

interface Props {
  color?: string;
}

export default function HeartIcon({ color = '#8F95B2' }: Props) {
  return <HeartSVGIcon className={styles.container} fill={color} stroke={color} />;
}
