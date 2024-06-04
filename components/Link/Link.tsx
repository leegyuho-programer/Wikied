'use client';

import { useState } from 'react';
import LinkIcon from '../SvgComponents/LinkIcon/LinkIcon';
import styles from './Link.module.css';
import LinkContent from './LinkContent';
import { usePathname, useSearchParams } from 'next/navigation';

const URL = 'https://www.wikied.kr';

function Link() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ID = '2gyuho_295';
  const linkText = `https://www.wikied.kr/${ID}`;
  const currentURL = `${URL}${pathname}?${searchParams.toString()}${ID}`;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} onClick={handleCopy}>
      <LinkIcon />
      <LinkContent text={currentURL} />
    </div>
  );
}

export default Link;
