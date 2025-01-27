import Gnb from './Gnb';
import styles from './NavBar.module.css';
import NavigatorBox from './NavigatorBox';

function NavBar() {
  return (
    <div className={styles.container}>
      <Gnb />
      <NavigatorBox />
    </div>
  );
}

export default NavBar;
