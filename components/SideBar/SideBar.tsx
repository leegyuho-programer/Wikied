import Content from './Content';
import ProfileImage from './ProfileImage';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <div className={styles.container}>
      <ProfileImage />
      <Content />
    </div>
  );
}

export default SideBar;
