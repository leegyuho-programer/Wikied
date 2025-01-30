import CameraSVGIcon from './CameraIcon.svg';
import styles from './CameraIcon.module.css';

interface Props {
  className?: string;
  color?: string;
}

export default function CameraIcon({ className, color = '#E4E5F0' }: Props) {
  return <CameraSVGIcon className={`${styles.container} ${className}`} fill={color} />;
}
