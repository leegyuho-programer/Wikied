'use client';

import { useState } from 'react';
import DropDownIcon from '../SvgComponents/DropDownIcon';
import styles from './DropDown.module.css';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

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
          placeholder={isOpen ? '질문 선택하기' : '질문 없음'}
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

export default DropDown;
