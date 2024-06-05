import Link from '../../../components/Link/Link';
import SearchBar from '../../../components/SearchBar/SearchBar';
import WikiIcon from '../../../components/SvgComponents/WikiIcon/WikiIcon';
import Pagination from './Pagination/Pagination';
import styles from './WikiListPage.module.css';

function WikiListPage() {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBar />
        <p className={styles.text}>"동욱"님을 총 3명 찾았습니다.</p>
      </div>
      <div className={styles.wikiBox}>
        <div className={styles.profile}>
          <div>
            <WikiIcon />
          </div>
          <div className={styles.intro}>
            <p className={styles.name}>김동욱</p>
            <p className={styles.data}>
              서울, 대한민국
              <br />
              대학생
            </p>
          </div>
        </div>
        <div className={styles.link}>
          <Link />
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default WikiListPage;
