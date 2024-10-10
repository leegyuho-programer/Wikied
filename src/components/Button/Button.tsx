import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

interface Props {
  variant: 'primary' | 'secondary' | 'gray' | 'white';
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  size?: 'XS' | 'S' | 'M' | 'ML' | 'L';
  disabled?: boolean;
  classname?: string;
}

const cn = classNames.bind(styles);

export default function Button({
  variant,
  children,
  type = 'button',
  onClick,
  size,
  disabled = false,
  classname,
}: Props) {
  const buttonClass = cn('button', variant, size, { disabled }, classname);

  return (
    <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
