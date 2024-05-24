'use client';

import { useState } from 'react';
import LinkIcon from '../SvgComponents/LinkIcon/LinkIcon';
import styles from './Link.module.css';
import LinkContent from './LinkContent';

function Link() {
  const ID = '2gyuho_295';
  const linkText = `https://www.wikied.kr/${ID}`;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} onClick={handleCopy}>
      <LinkIcon />
      <LinkContent text={linkText} />
    </div>
  );
}

export default Link;
