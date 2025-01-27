import CameraSVGIcon from './CameraIcon.svg';
import styles from './CameraIcon.module.css';

export default function CameraIcon({ className }: { className?: string }) {
  return <CameraSVGIcon className={`${styles.container} ${className}`} />;
}
