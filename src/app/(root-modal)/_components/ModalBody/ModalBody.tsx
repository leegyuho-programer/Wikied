import { ReactNode } from 'react';
import styles from './ModalBody.module.css';

interface Props {
  children?: ReactNode;
}

function ModalBody({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default ModalBody;
