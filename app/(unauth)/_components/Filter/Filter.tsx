'use client';

import { useState } from 'react';
import styles from './Filter.module.css';
import DropDownIcon from '../../../../components/SvgComponents/DropDownIcon';

const options = ['최신순', '인기순'];

function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <input
          type="text"
          value={selectedOption}
          placeholder="질문 없음"
          readOnly
          className={`${styles.input} ${isOpen ? styles.focus : ''}`}
        />
        <button className={`${styles.button} ${isOpen ? styles.rotate : ''}`} onClick={toggleDropdown}>
          <DropDownIcon />
        </button>
      </div>
      <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <div key={index} className={styles.dropdownItem} onClick={() => handleOptionClick(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;