import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
  variant: 'primary' | 'secondary' | 'gray' | 'white';
  isLink: boolean;
  destination?: string;
  children?: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  size: 'XS' | 'S' | 'M' | 'ML' | 'L';
  disabled?: boolean;
}

function Button({ variant, isLink, destination, children, type, onClick, size, disabled }: Props) {
  const className = `${styles.button} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''}`;

  return (
    <>
      {isLink ? (
        <Link href={`${destination}`} className={className}>
          {children}
        </Link>
      ) : (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
