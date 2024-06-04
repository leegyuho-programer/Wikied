import { ReactNode } from 'react';
import SideBar from '../../../components/SideBar/SideBar';
import styles from './layout.module.css';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      {children}
      <SideBar />
    </div>
  );
}

export default Layout;

// 사이드바 따라서 내려가도록??
