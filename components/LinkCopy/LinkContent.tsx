import styles from './LinkContent.module.css';

interface Props {
  text: string;
}

function LinkContent({ text }: Props) {
  return <span className={styles.container}>{text}</span>;
}

export default LinkContent;
