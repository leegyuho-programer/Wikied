'use client';

import { useState } from 'react';
import DropDownIcon from '../SvgComponents/DropDownIcon';
import Button from '../Button/Button';
import styles from './DropDown.module.css';
import { PostProfileRequestType } from '../../types/profile';

interface DropDownProps {
  onSelectionChange: (question: string, answer: string) => void;
  onSubmit: (data: PostProfileRequestType) => void;
  isSubmitting: boolean;
}

const options = ['싫어하는 음식은?', '좋아하는 음식은?', '좋아하는 운동은?', '내 별명은?'];

function DropDown({ onSelectionChange, onSubmit, isSubmitting }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [additionalInput, setAdditionalInput] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectionChange(option, additionalInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAdditionalInput(value);
    onSelectionChange(selectedOption, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ securityQuestion: selectedOption, securityAnswer: additionalInput });
  };

  return (
    <form className={styles.containerWrapper} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          name="securityQuestion"
          type="text"
          value={selectedOption}
          placeholder={isOpen ? '질문 선택하기' : '질문 없음'}
          readOnly
          className={`${styles.input} ${isOpen ? styles.focus : ''}`}
        />
        <button type="button" className={`${styles.button} ${isOpen ? styles.rotate : ''}`} onClick={toggleDropdown}>
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
      {selectedOption && (
        <input
          name="securityAnswer"
          type="text"
          placeholder="추가 입력"
          value={additionalInput}
          onChange={handleInputChange}
          className={styles.additionalInput}
        />
      )}
      <div className={styles.buttonWrapper}>
        <Button isLink={false} type="submit" size="XS" variant="primary" disabled={isSubmitting}>
          저장하기
        </Button>
      </div>
    </form>
  );
}

export default DropDown;
