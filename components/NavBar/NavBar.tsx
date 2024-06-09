import Link from 'next/link';
import Button from '../Button/Button';
import MenuIcon from '../SvgComponents/MenuIcon';
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
