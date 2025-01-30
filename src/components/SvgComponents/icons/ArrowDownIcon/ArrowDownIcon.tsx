import ArrowDownSVGIcon from './ArrowDownIcon.svg';
import styles from './ArrowDownIcon.module.css';

interface Props {
  color?: string;
}

export default function ArrowDownIcon({ color = '#C6CADA' }: Props) {
  return <ArrowDownSVGIcon className={styles.container} fill={color} />;
}
