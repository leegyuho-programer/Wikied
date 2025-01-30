import DropDownSVGIcon from './DropDownIcon.svg';

interface Props {
  color?: string;
}

export default function DropDownIcon({ color = '#8F95B2' }: Props) {
  return <DropDownSVGIcon fill={color} />;
}
