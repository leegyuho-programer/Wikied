import styles from './ModalHeader.module.css';

interface Props {
  text: string;
}

function ModalHeader({ text }: Props) {
  return <h1 className={styles.container}>{text}</h1>;
}

export default ModalHeader;
