import ProfileIcon from '../SvgComponents/ProfileIcon/ProfileIcon';
import styles from './ProfileImage.module.css';

function ProfileImage() {
  return (
    <div className={styles.container}>
      <ProfileIcon />
      {/* <label className={styles.label}>
        <input type="file" className={styles.input}></input>
      </label> */}
    </div>
  );
}

export default ProfileImage;
