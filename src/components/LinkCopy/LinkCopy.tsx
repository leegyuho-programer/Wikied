import { usePathname, useSearchParams } from 'next/navigation';
import LinkIcon from '../SvgComponents/LinkIcon/LinkIcon';
import LinkContent from './LinkContent';
import styles from './LinkCopy.module.css';
import { useStore } from '@/store';

interface Props {
  profileId: number;
  onCopy: (isCopied: boolean) => void;
}

const BASE_URL = `https://wikied.netlify.app`;

function LinkCopy({ profileId, onCopy }: Props) {
  const { user } = useStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const currentURL = `${BASE_URL}${pathname}?${searchParams.toString()}${ID}`;
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
      <LinkIcon />
      <LinkContent text={currentURL} />
    </div>
  );
}

export default LinkCopy;
