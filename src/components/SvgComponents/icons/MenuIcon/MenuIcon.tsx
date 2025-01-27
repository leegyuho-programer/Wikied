import MenuSVGIcon from './MenuIcon.svg';

interface Props {
  onClick: () => void;
}

export default function MenuIcon({ onClick }: Props) {
  return <MenuSVGIcon onClick={onClick} />;
}
