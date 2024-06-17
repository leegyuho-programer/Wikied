import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames/bind';

interface Props {
  variant: 'primary' | 'secondary' | 'gray' | 'white';
  isLink: boolean;
  destination?: string;
  children?: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  size?: 'XS' | 'S' | 'M' | 'ML' | 'L';
  disabled?: boolean;
  classname?: string;
}

const cn = classNames.bind(styles);

function Button({ variant, isLink, destination, children, type, onClick, size, disabled, classname }: Props) {
  const buttonClass = cn('button', variant, size, { disabled }, classname);

  return (
    <>
      {isLink ? (
        <Link href={`${destination}`} className={buttonClass}>
          {children}
        </Link>
      ) : (
        <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
