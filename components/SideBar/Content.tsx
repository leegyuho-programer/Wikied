import styles from './Content.module.css';

const data = [
  { title: '거주 도시', answer: '서울' },
  { title: 'MBTI', answer: 'INFJ' },
  { title: '직업', answer: '코드잇 콘텐츠 프로듀서' },
  { title: 'SNS 계정', answer: 'dlwlehd_official' },
  { title: '생일', answer: '1999-12-31' },
  { title: '별명', answer: '없음' },
  { title: '혈액형', answer: 'A' },
  { title: '국적', answer: '대한민국' },
];

function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.lineWrapper}>
        {data.map((item, index) => (
          <div className={styles.line} key={index}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
