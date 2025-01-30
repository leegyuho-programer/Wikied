import MenuSVGIcon from './MenuIcon.svg';

interface Props {
  onClick: () => void;
  color?: string;
}

export default function MenuIcon({ onClick, color = '#8F95B2' }: Props) {
  return <MenuSVGIcon onClick={onClick} fill={color} />;
}
