import Link from '../../../../components/Link/Link';
import styles from './MyPage.module.css';

function MyPage() {
  return (
    <div className={styles.container}>
      {/* 이름 데이터 가져오기 */}
      <p className={styles.name}>이지동</p>
      <Link />
      {/* 데이터가 있는지 없는지에 따라 다르게 보이게 하기 */}
      <div className={styles.nodata}>
        <p>
          아직 작성된 내용이 없네요.
          <br />
          친구들을 위키로 초대해 보세요!
        </p>
      </div>
    </div>
  );
}

export default MyPage;

// 내 위키 페이지
// 유저 위키 페이지
