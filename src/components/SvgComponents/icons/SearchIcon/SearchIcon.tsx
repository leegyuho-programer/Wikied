import SearchSVGIcon from './SearchIcon.svg';

interface Props {
  color?: string;
}

export default function SearchIcon({ color = '#8F95B2' }: Props) {
  return <SearchSVGIcon fill={color} />;
}
