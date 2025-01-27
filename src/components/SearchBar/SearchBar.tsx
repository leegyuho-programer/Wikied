'use client';

import classNames from 'classnames/bind';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { CancelIcon, SearchIcon } from '../SvgComponents';
import styles from './SearchBar.module.css';

const cn = classNames.bind(styles);

interface Props {
  onSearch: (searchTerm: string) => void;
  className?: string;
}

function SearchBar({ onSearch, className }: Props) {
  const [inputValue, setInputValue] = useState('');

  // debounce 적용: 사용자가 입력을 멈춘 뒤 500ms 후에 검색을 트리거
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    // 컴포넌트 unmount 시 debounce를 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedSearch(event.target.value); // 입력이 바뀔 때마다 debounce를 통해 검색
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      debouncedSearch.cancel(); // Enter 시 debounce 대기 중인 작업 취소
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    debouncedSearch.cancel(); // 버튼 클릭 시 debounce 대기 중인 작업 취소
    onSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue('');
    debouncedSearch.cancel(); // 검색어 초기화 시 debounce 대기 중인 작업 취소
    onSearch(''); // 검색어 초기화
  };

  return (
    <div className={cn(styles.container, className)}>
      <SearchIcon />
      <input
        type="text"
        className={styles.input}
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
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
