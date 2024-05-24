import LinkIcon from '../SvgComponents/LinkIcon/LinkIcon';
import styles from './Link.module.css';
import LinkContent from './LinkContent';

function Link() {
  return (
    <div className={styles.container}>
      <LinkIcon />
      <LinkContent />
    </div>
  );
}

export default Link;
