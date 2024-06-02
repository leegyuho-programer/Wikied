import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
  variant?: 'primary' | 'secondary' | 'gray';
  isLink: boolean;
  destination?: string;
  children?: ReactNode;
  type?: 'button';
  onClick?: () => void;
  isLittle?: boolean;
  isMedium?: boolean;
}

function Button({
  variant = 'primary',
  isLink,
  destination,
  children,
  type,
  onClick,
  isLittle = false,
  isMedium = false,
}: Props) {
  const className = `${styles.button} ${styles[variant]} ${isLittle ? styles.littleButton : ''} ${
    isMedium ? styles.mediumButton : ''
  }`;

  return (
    <>
      {isLink ? (
        <Link href={`${destination}`} className={className}>
          {children}
        </Link>
      ) : (
        <button className={className} type={type} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
