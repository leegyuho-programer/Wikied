'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const URL = 'https://www.wikied.kr';

function CurrentPageURL() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 페이지의 전체 URL 구성
  const currentURL = `${URL}${pathname}?${searchParams.toString()}`;

  return (
    <div>
      <p>Current Page URL: {currentURL}</p>
    </div>
  );
}

export default CurrentPageURL;
