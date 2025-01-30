import LockSVGIcon from './LockIcon.svg';

interface Props {
  color?: string;
}

export default function LockIcon({ color = '#8F95B2' }: Props) {
  return <LockSVGIcon fill={color} />;
}
