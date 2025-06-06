'use client';

import { DropDownIcon } from '@/components/SvgComponents';
import { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.css';

interface Props {
  onSortChange: (option: string) => void;
}

const options = ['최신순', '인기순'];

function Filter({ onSortChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option); // 정렬 기준 변경 이벤트를 부모 컴포넌트로 전달
  };

  useEffect(() => {
    // 외부 클릭을 감지하는 이벤트 핸들러
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.containerWrapper} ref={dropdownRef}>
      <div className={styles.container}>
        <button
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={styles.input}
          onClick={toggleDropdown}
          // onKeyDown={handleKeyDown}
        >
          {selectedOption}
        </button>
        <button
          className={`${styles.button} ${isOpen ? styles.rotate : ''}`}
          onClick={toggleDropdown}
          aria-label="정렬 옵션 선택"
        >
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
