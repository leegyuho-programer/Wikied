'use client';

import { useStore } from '@/store';
import { PostProfileRequestType } from '@/types/profile';
import { useState } from 'react';
import { DropDownIcon } from '../SvgComponents';
import Button from '../Button/Button';
import styles from './DropDown.module.css';

interface DropDownProps {
  onSelectionChange: (question: string, answer: string) => void;
  onSubmit: (data: PostProfileRequestType) => void;
  isSubmitting: boolean;
  initialQuestion?: string; // 초기 질문 값
  initialAnswer?: string; // 초기 답변 값
}

const options = ['직접 입력', '싫어하는 음식은?', '좋아하는 음식은?', '좋아하는 운동은?', '내 별명은?'];

function DropDown({ onSelectionChange, onSubmit, isSubmitting, initialQuestion, initialAnswer }: DropDownProps) {
  const setSecurityQuestion = useStore((state) => state.setSecurityQuestion);
  const setSecurityAnswer = useStore((state) => state.setSecurityAnswer);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialQuestion || ''); // 초기 질문 값 설정
  const [additionalInput, setAdditionalInput] = useState(initialAnswer || ''); // 초기 답변 값 설정

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const newQuestion = option === '직접 입력' ? '' : option;
    setSelectedOption(newQuestion);
    setIsOpen(false);
    onSelectionChange(newQuestion, additionalInput);
    if (setSecurityQuestion) setSecurityQuestion(newQuestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAdditionalInput(value);
    onSelectionChange(selectedOption, value);
    if (setSecurityAnswer) setSecurityAnswer(value);
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
          value={selectedOption === '직접 입력' ? '' : selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={`${styles.input} ${isOpen ? styles.focus : ''}`}
          placeholder={isOpen ? '질문 선택하기' : '직접 입력'}
        />
        <button
          type="button"
          className={`${styles.button} ${isOpen ? styles.rotate : ''}`}
          onClick={toggleDropdown}
          aria-label="질문 선택하기"
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
      {selectedOption && selectedOption !== '직접 입력' && (
        <input
          name="securityAnswer"
          type="text"
          placeholder="답변 입력"
          value={additionalInput}
          onChange={handleInputChange}
          className={styles.additionalInput}
        />
      )}
      <div className={styles.buttonWrapper}>
        <Button type="submit" size="XS" variant="primary" disabled={isSubmitting}>
          저장하기
        </Button>
      </div>
    </form>
  );
}

export default DropDown;
