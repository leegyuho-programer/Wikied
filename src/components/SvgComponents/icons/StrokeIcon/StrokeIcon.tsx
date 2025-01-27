// import styles from './StrokeIcon.module.css';

// function StrokeIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" className={styles.container} fill="none">
//       <path d="M0 1H400" stroke="#E4E5F0" />
//     </svg>
//   );
// }

// export default StrokeIcon;

import StrokeSVGIcon from './StrokeIcon.svg';
import styles from './StrokeIcon.module.css';

interface Props {
  width?: number;
  className?: string;
  margin?: string;
}

export default function StrokeIcon({ width = 1000, className, margin = '30px 0' }: Props) {
  return (
    <StrokeSVGIcon
      className={`${styles.container} ${className || ''}`}
      style={{ margin }}
      width="100%"
      viewBox={`0 0 ${width} 2`}
    />
  );
}
