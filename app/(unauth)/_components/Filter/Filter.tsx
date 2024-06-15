'use client';

import { useState } from 'react';
import styles from './Filter.module.css';
import DropDownIcon from '../../../../components/SvgComponents/DropDownIcon';

interface FilterProps {
  onSortChange: (option: string) => void;
}

const options = ['최신순', '인기순'];

function Filter({ onSortChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option); // 정렬 기준 변경 이벤트를 부모 컴포넌트로 전달
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
