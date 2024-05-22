import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
  variant?: 'primary' | 'secondary';
  isLink: boolean;
  destination?: string;
  children?: ReactNode;
  type?: 'button';
  onClick?: () => void;
  isLittle?: boolean;
}

function Button({ variant = 'primary', isLink, destination, children, type, onClick, isLittle = false }: Props) {
  const className = `${styles.button} ${styles[variant]} ${isLittle ? styles.littleButton : ''}`;

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
