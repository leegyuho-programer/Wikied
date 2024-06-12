import Button from '../../../../components/Button/Button';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import Article from '../Article/Article';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import styles from './FreeBoardPage.module.css';

export default function FreeBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>베스트 게시글</h1>
        <Button variant="primary" isLink={true} destination="/" size="M">
          게시물 등록하기
        </Button>
      </div>
      <div className={styles.card}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar />
          <Button variant="primary" isLink={false} size="XS">
            검색
          </Button>
          <Filter />
        </div>
        <div>내용들</div>
      </div>
      <Pagination />
    </div>
  );
}
