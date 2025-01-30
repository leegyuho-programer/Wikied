import ProfileSVGIcon from './ProfileIcon.svg';
import styles from './ProfileIcon.module.css';

interface Props {
  color?: string;
}

export default function ProfileIcon({ color = '#C6CADA' }: Props) {
  return (
    <div className={styles.container}>
      <ProfileSVGIcon className={styles.icon} fill={color} />
    </div>
  );
}
