import Image from 'next/image';
import LinkContent from './LinkContent';
import styles from './LinkCopy.module.css';

interface Props {
  profileId: number;
  onCopy: (isCopied: boolean) => void;
}

const BASE_URL = `https://wikied.vercel.app`;

function LinkCopy({ profileId, onCopy }: Props) {
  const currentURL = `${BASE_URL}/user/${profileId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      onCopy(true);
      setTimeout(() => onCopy(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container} onClick={handleCopy}>
      <Image src="/icons/LinkIcon.svg" width={20} height={20} alt="LinkIcon" className={styles.icon} />
      <LinkContent text={currentURL} />
    </div>
  );
}

export default LinkCopy;
