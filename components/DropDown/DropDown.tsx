'use client';

import { useState } from 'react';
import DropDownIcon from '../SvgComponents/DropDownIcon';
import styles from './DropDown.module.css';
import { useForm } from 'react-hook-form';

interface DropDownProps {
  onSelectionChange: (question: string, answer: string) => void;
}

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function DropDown({ onSelectionChange }: DropDownProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostProfile>();

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
    onSelectionChange(selectedOption, value); // 입력 변경 시 부모 컴포넌트로 데이터 전달
  };

  // const handleSignUp = async (data: PostProfile) => {
  //   try {
  //     const response = await fetch(`https://wikied-api.vercel.app/0-이규호/profile`, {
  //       method: 'POST', // HTTP 메서드를 명시적으로 설정
  //       headers: {
  //         'Content-Type': 'application/json', // JSON 형식의 데이터를 보내기 위해 Content-Type 헤더 설정
  //       },
  //       body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 body에 설정
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const responseData = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
  //     return responseData; // 필요한 경우 응답 데이터를 반환
  //   } catch (error: any) {
  //     console.error('Error:', error);
  //     throw error; // 에러를 호출자에게 전달
  //   }
  // };

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
      {selectedOption && (
        <input
          type="text"
          placeholder="추가 입력"
          value={additionalInput}
          onChange={handleInputChange}
          className={styles.additionalInput}
        />
      )}
    </div>
  );
}

export default DropDown;
