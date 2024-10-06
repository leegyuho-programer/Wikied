import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(isLeapYear);
dayjs.locale('ko');

export function getRelativeTime(dateString: string): string {
  return dayjs(dateString).from(dayjs());
}
// 주어진 날짜 문자열이 현재로부터 얼마나 이전인지 상대적인 시간을 반환합니다.
// console.log(getRelativeTime('2024-02-20')); // '4일 전' 같은 상대적인 시간

export function isLeap(year: number): boolean {
  return dayjs(`${year}-01-01`).isLeapYear();
}
// 주어진 년도가 윤년인지 여부를 반환합니다.
// console.log(isLeap(2024)); // true (윤년인 경우)

export function getDayOfWeek(dateString: string): string {
  return dayjs(dateString).format('dddd');
}
// 주어진 날짜의 요일을 반환합니다.
// console.log(getDayOfWeek('2024-02-24')); // '일요일' 같은 요일

export function getCurrentDateTime(): string {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}
// 현재 날짜와 시간을 'YYYY-MM-DD HH:mm:ss' 형식의 문자열로 반환합니다.
// console.log(getCurrentDateTime()); // '2024-02-24 12:34:56' 같은 현재 날짜와 시간

export function getDifferenceInDays(dateString1: string, dateString2: string): number {
  return dayjs(dateString1).diff(dayjs(dateString2), 'day');
}
// 두 날짜 사이의 차이를 일 단위로 반환합니다.
// console.log(getDifferenceInDays('2024-02-24', '2024-02-20')); // 4 (두 날짜 사이의 일수 차이)

export function formatDate(dateString: string): string {
  const now = dayjs();
  const date = dayjs(dateString);
  const diffDays = now.diff(date, 'day');

  if (diffDays < 7) {
    return getRelativeTime(dateString);
  } else {
    return date.format('YYYY. M. D');
  }
}
// 7일 이내의 날짜는 상대적인 시간으로, 7일 이후는 'YYYY. M. D' 형식으로 반환합니다.
// console.log(formatDate('2024-02-20')); // '4일 전' 또는 '2024. 2. 20'
