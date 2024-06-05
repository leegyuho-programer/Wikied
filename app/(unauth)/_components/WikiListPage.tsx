import Link from '../../../components/Link/Link';
import SearchBar from '../../../components/SearchBar/SearchBar';
import ProfileIcon from '../../../components/SvgComponents/ProfileIcon/ProfileIcon';
import Pagination from './Pagination/Pagenation';
import styles from './WikiListPage.module.css';

function WikiListPage() {
  return (
    <div className={styles.container}>
      <div>
        <SearchBar />
        <p>"동욱"님을 총 3명 찾았습니다.</p>
      </div>
      <div>
        <div>
          <div>
            <ProfileIcon />
          </div>
          <div>
            <p>김동욱</p>
            <p>서울, 대한민국</p>
            <p>대학생</p>
          </div>
        </div>
        <div>
          <Link />
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default WikiListPage;
