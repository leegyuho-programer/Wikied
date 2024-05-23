import styles from './ArrowDownIcon.module.css';

interface Props {
  onClick?: () => void;
}

function ArrowDownIcon({ onClick }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={styles.container}
    >
      <path
        d="M11.9999 14.6617C11.8794 14.6617 11.7672 14.6425 11.6634 14.604C11.5595 14.5656 11.4608 14.4996 11.3672 14.406L6.87301 9.91175C6.73454 9.7733 6.66371 9.59927 6.66051 9.38965C6.65729 9.18003 6.72812 9.00279 6.87301 8.85792C7.01787 8.71306 7.1935 8.64062 7.3999 8.64062C7.6063 8.64062 7.78194 8.71306 7.9268 8.85792L11.9999 12.931L16.073 8.85792C16.2115 8.71947 16.3855 8.64864 16.5951 8.64542C16.8047 8.64222 16.9819 8.71306 17.1268 8.85792C17.2717 9.00279 17.3441 9.17843 17.3441 9.38485C17.3441 9.59125 17.2717 9.76688 17.1268 9.91175L12.6326 14.406C12.539 14.4996 12.4403 14.5656 12.3364 14.604C12.2326 14.6425 12.1204 14.6617 11.9999 14.6617Z"
        fill="#C6CADA"
      />
    </svg>
  );
}

export default ArrowDownIcon;
