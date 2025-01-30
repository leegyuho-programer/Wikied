import CancelSVGIcon from './CancelIcon.svg';

interface Props {
  color?: string;
}

export default function CancelIcon({ color = '#323232' }: Props) {
  return <CancelSVGIcon fill={color} />;
}
