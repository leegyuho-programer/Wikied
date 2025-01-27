import ProfileSVGIcon from './ProfileIcon.svg';
import styles from './ProfileIcon.module.css';

export default function ProfileIcon() {
  return (
    <div className={styles.container}>
      <ProfileSVGIcon className={styles.icon} />
    </div>
  );
}
