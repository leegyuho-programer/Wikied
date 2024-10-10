import Link from 'next/link';
import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

interface Props {
  variant: 'primary' | 'secondary' | 'gray' | 'white';
  destination: string;
  children: ReactNode;
  size?: 'XS' | 'S' | 'M' | 'ML' | 'L';
  disabled?: boolean;
  classname?: string;
}

const cn = classNames.bind(styles);

export default function LinkButton({ variant, destination, children, size, disabled = false, classname }: Props) {
  const linkClass = cn('button', variant, size, { disabled }, classname);

  // disabled 상태일 때 링크 클릭 방지
  if (disabled) {
    return (
      <span className={linkClass} aria-disabled="true" role="button" tabIndex={-1}>
        {children}
      </span>
    );
  }

  return (
    <Link href={destination} className={linkClass}>
      {children}
    </Link>
  );
}
