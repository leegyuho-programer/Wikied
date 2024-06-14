'use client';

import { useState } from 'react';
import SearchIcon from '../SvgComponents/SearchIcon';
import CancelIcon from '../SvgComponents/CancelIcon'; // x 버튼 아이콘 추가
import styles from './SearchBar.module.css';
import Button from '../Button/Button';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue('');
    onSearch(''); // 검색어 초기화
  };

  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        type="text"
        className={styles.input}
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {inputValue && ( // 검색어가 있을 때만 x 버튼을 표시
        <button className={styles.clearButton} onClick={clearSearch}>
          <CancelIcon />
        </button>
      )}
      <button className={styles.button} onClick={handleSearchClick}>
        검색
      </button>
    </div>
  );
}

export default SearchBar;
