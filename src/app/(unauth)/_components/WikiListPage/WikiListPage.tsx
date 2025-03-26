'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import styles from './WikiListPage.module.css';
import WikiListPageSkeleton from './WikiListPageSkeleton';

function WikiListPage() {
  const profileId = useStore((state) => state.profileId);

  const [isCopied, setIsCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // 서버에서 페이지네이션된 데이터만 가져오기
  const { data, isPending, isPlaceholderData } = useQuery({
    queryKey: ['profiles', page, pageSize, searchTerm, profileId],
    queryFn: async () => {
      // 본인 프로필 필터링 때문에 하나 더 가져오도록 처리
      const adjustedPageSize = profileId && !searchTerm ? pageSize + 1 : pageSize;

      // 1. 먼저 기본 프로필 목록을 페이지 크기만큼만 가져옴
      const response = await getProfile(page, adjustedPageSize, searchTerm);

      // 2. 각 프로필의 상세 정보를 병렬로 가져옴
      const profiles = await Promise.all(response.list.map((profile) => getProfileCode(profile.code)));

      // 3. 본인 프로필이 있으면 필터링
      const filteredProfiles = profileId ? profiles.filter((profile) => profile.id !== profileId) : profiles;

      // 4. 페이지 크기에 맞게 잘라내기 (3개만 보여주기)
      const paginatedProfiles = filteredProfiles.slice(0, pageSize);

      // 5. 총 개수 조정 (본인 프로필 제외)
      const adjustedTotalCount = searchTerm
        ? response.totalCount
        : profileId
        ? Math.max(0, response.totalCount - (profiles.length > filteredProfiles.length ? 1 : 0))
        : response.totalCount;

      return {
        profiles: paginatedProfiles,
        totalCount: adjustedTotalCount,
      };
    },
    placeholderData: keepPreviousData,
  });

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(1);
  };

  if (isPending) return <WikiListPageSkeleton />;

  const profiles = data?.profiles || [];
  const totalProfiles = data?.totalCount || 0;

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBar onSearch={handleSearch} />
        <p className={styles.text}>{`${
          searchTerm ? `"${searchTerm}"님을(를) ` : ''
        }총 ${totalProfiles}명 찾았습니다.`}</p>
      </div>
      <div className={styles.wikiBoxContainer}>
        {profiles.length > 0 ? (
          profiles.map((profile: GetProfileCodeResponseType, index) => (
            <Link key={profile.id} className={styles.wikiBox} href={`/user/${profile.id}`} passHref>
              <div className={styles.profile}>
                <div className={styles.info}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={profile.image || '/images/default.jpg'}
                      alt={`${profile.name}의 프로필 이미지`}
                      style={{ objectFit: 'fill', width: '100%', height: '100%' }}
                      width={85}
                      height={85}
                      priority={index < 3} // 첫 번째 3개 이미지만 우선 로딩
                    />
                  </div>
                  <div className={styles.intro}>
                    <p className={styles.name}>{profile.name}</p>
                    <p className={styles.data}>
                      {profile.city} {profile.nationality}
                      <br />
                      {profile.job}
                    </p>
                  </div>
                </div>
                <div className={styles.link}>
                  {profile.id && <LinkCopy profileId={profile.id} onCopy={setIsCopied} />}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noResultContainer}>
            <div className={styles.noResults}>{`"${searchTerm}" 일치하는 검색 결과가 없어요.`}</div>
            <Image src="/images/noResult.png" width={144} height={144} alt="검색 결과 없음 이미지" priority />
          </div>
        )}
      </div>
      {profiles.length > 0 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalArticles={totalProfiles}
          articlesPerPage={pageSize}
          isPlaceholderData={isPlaceholderData}
          isPending={isPending}
        />
      )}
    </div>
  );
}

export default WikiListPage;
