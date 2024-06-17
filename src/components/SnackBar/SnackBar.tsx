'use client';

import { useState } from 'react';
import { failModify, successCopy } from '@/constants/SnackBarMassage';
import FailIcon from '../SvgComponents/FailIcon/FailIcon';
import SuccessIcon from '../SvgComponents/SuccessIcon/SuccessIcon';
import styles from './SnackBar.module.css';

interface Props {
  type: string;
}

function SnackBar({ type }: Props) {
  const [toast, setToast] = useState(false);

  return (
    <div className={`${styles.container} ${type ? styles.successContainer : styles.failContainer}`}>
      {type ? <SuccessIcon /> : <FailIcon />}
      {type ? successCopy : failModify}
    </div>
  );
}

export default SnackBar;

// snackbar를 사용하는 곳에서 성공했는지 실패했는지와 메세지를 prop으로 받아와서
// true일 때와 false일 때 내용, 색, 크기를 다르게 보여주도록
// text는 따로 상수로 만들어놓고 사용하기

// type이 무엇인지에 따라 나누기?
