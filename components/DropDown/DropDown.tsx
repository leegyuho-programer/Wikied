'use client';

import { useState } from 'react';
import DropDownIcon from '../SvgComponents/DropDownIcon';
import styles from './DropDown.module.css';

function DropDown() {
  const [isOpen, SetIsOpen] = useState(false);

  const toggleButton = () => {
    SetIsOpen(!isOpen);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <input type="text" placeholder={isOpen ? '직접 입력' : '질문 없음'} className={styles.input} />
        <button className={`${styles.button} ${isOpen ? styles.rotate : ''}`} onClick={toggleButton}>
          <DropDownIcon />
        </button>
      </div>
    </div>
  );
}

export default DropDown;
