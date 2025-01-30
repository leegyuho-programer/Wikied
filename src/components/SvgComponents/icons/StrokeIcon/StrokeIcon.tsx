import StrokeSVGIcon from './StrokeIcon.svg';
import styles from './StrokeIcon.module.css';

interface Props {
  className?: string;
  margin?: string;
  color?: string;
}

export default function StrokeIcon({ className, margin = '30px 0', color = '#E4E5F0' }: Props) {
  return <StrokeSVGIcon className={`${styles.container} ${className || ''}`} style={{ margin }} stroke={color} />;
}
