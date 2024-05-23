import styles from './Content.module.css';

const data = [
  { title: '거주 도시', answer: '안양' },
  { title: 'MBTI', answer: 'ISFP' },
  { title: '직업', answer: '코드잇 인턴' },
  { title: 'SNS 계정', answer: '2gyuho_295' },
  { title: '생일', answer: '1998-03-03' },
  { title: '별명', answer: '없음' },
  { title: '혈액형', answer: 'A' },
  { title: '국적', answer: '대한민국' },
];

interface Props {
  showAll: boolean;
}

function Content({ showAll }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.lineWrapper}>
        {data.map((item, index) => (
          <div className={styles.line} key={index} style={{ display: showAll || index < 3 ? 'flex' : 'none' }}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
