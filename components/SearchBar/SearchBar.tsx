import SearchIcon from '../SvgComponents/SearchIcon';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.container}>
      <SearchIcon />
      <input type="text" className={styles.input} />
    </div>
  );
}

export default SearchBar;
