import { usePathname, useSearchParams } from 'next/navigation';
import LinkIcon from '../SvgComponents/LinkIcon/LinkIcon';
import LinkContent from './LinkContent';
import styles from './LinkCopy.module.css';

interface Props {
  onCopy: (isCopied: boolean) => void;
}

const BASE_URL = 'https://www.wikied.kr';

function LinkCopy({ onCopy }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ID = '2gyuho_295';
  const currentURL = `${BASE_URL}${pathname}?${searchParams.toString()}${ID}`;

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
