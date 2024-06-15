import { CONTENT, HEADER } from '../../../constants/ModalText';
import styles from './ModalBody.module.css';

function ModalBody() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{HEADER.timeOver}</h1>
      <p className={styles.content}>{CONTENT.timeOver}</p>
    </div>
  );
}

export default ModalBody;
