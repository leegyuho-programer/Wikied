import styles from './NavBarProfileIcon.module.css';

interface Props {
  onClick: () => void;
}

function NavBarProfileIcon({ onClick }: Props) {
  return (
    <svg className={styles.icon} onClick={onClick} viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon">
        <circle id="Ellipse 14" cx="42.5" cy="42.5" r="42.5" fill="#F7F7FA" />
        <path
          id="Vector"
          d="M42.5 0C19.0254 0 0 19.0254 0 42.5C0 65.9746 19.0254 85 42.5 85C65.9746 85 85 65.9746 85 42.5C85 19.0254 65.9746 0 42.5 0ZM42.5 21.25C49.1024 21.25 54.4531 26.6023 54.4531 33.2031C54.4531 39.8039 49.1074 45.1562 42.5 45.1562C35.8992 45.1562 30.5469 39.8039 30.5469 33.2031C30.5469 26.6023 35.8926 21.25 42.5 21.25ZM42.5 74.375C33.7128 74.375 25.749 70.8007 19.9717 65.03C22.6611 58.0889 29.3018 53.125 37.1875 53.125H47.8125C55.7049 53.125 62.3455 58.0855 65.0283 65.03C59.251 70.8057 51.2822 74.375 42.5 74.375Z"
          fill="#C6CADA"
        />
      </g>
    </svg>
  );
}

export default NavBarProfileIcon;
