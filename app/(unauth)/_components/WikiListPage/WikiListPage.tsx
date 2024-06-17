'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import defaultIMG from '../../../../public/images/default.jpg';
import noResult from '../../../../public/images/noResult.png';
import Pagination from '../Pagination/Pagination';
import styles from './WikiListPage.module.css';
import { useStore } from '../../../../store';
import { GetProfileCodeResponseType } from '../../../../types/profile';
import { getProfile } from '../../../../api/profile/profile';
import { getProfileCode } from '../../../../api/profile/profileCode';

function WikiListPage() {
  const { setProfileId, setProfileImage } = useStore((state) => ({
    setProfileId: state.setProfileId,
    setProfileImage: state.setProfileImage,
  }));

  const [isCopied, setIsCopied] = useState(false);
  const [profiles, setProfiles] = useState<GetProfileCodeResponseType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3); // 페이지 크기 고정 (필요에 따라 조정 가능)
  const [totalProfiles, setTotalProfiles] = useState(0); // 총 프로필 수

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(1); // 검색 시 페이지를 처음으로 리셋
  };

  useEffect(() => {
    const fetchProfiles = async (page: number, pageSize: number, searchTerm: string) => {
      try {
        const response = await getProfile(page, pageSize, searchTerm);
        if (searchTerm) {
          if (response.list.length > 0) {
            const codeId = response.list[0].code;
            const profile = await getProfileCode(codeId);
            setProfiles([profile]);
            setProfileId(profile.id ?? null); // Nullish Coalescing 연산자 사용
            setProfileImage(profile.image ?? null); // Nullish Coalescing 연산자 사용
          } else {
            setProfiles([]);
            setProfileId(null);
            setProfileImage(null);
          }
        } else {
          const allProfiles = await Promise.all(response.list.map(async (profile) => getProfileCode(profile.code)));
          setProfiles(allProfiles);
          const firstProfile = allProfiles.length > 0 ? allProfiles[0] : null;
          if (firstProfile) {
            setProfileId(firstProfile.id ?? null); // Nullish Coalescing 연산자 사용
            setProfileImage(firstProfile.image ?? null); // Nullish Coalescing 연산자 사용
          } else {
            setProfileId(null);
            setProfileImage(null);
          }
        }
        setTotalProfiles(response.totalCount); // 총 프로필 수 설정
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    fetchProfiles(page, pageSize, searchTerm);
  }, [page, pageSize, searchTerm, setProfileId, setProfileImage]);

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
          profiles.map((profile) => (
            <Link key={profile.id} className={styles.wikiBox} href={`/user/${profile.id}`} passHref>
              <div className={styles.profile}>
                <div className={styles.info}>
                  {profile?.image ? (
                    <Image
                      src={profile.image}
                      alt={`${profile.name}의 프로필 이미지`}
                      layout="fill"
                      className={styles.image}
                    />
                  ) : (
                    <Image src={defaultIMG} alt="기본 이미지" className={styles.image} />
                  )}
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
            <Image src={noResult} width={144} height={144} alt="검색 결과 없음 이미지" />
          </div>
        )}
      </div>
      {profiles.length > 0 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalArticles={totalProfiles}
          pageCount={Math.ceil(totalProfiles / pageSize)}
          articlesPerPage={pageSize}
        />
      )}
    </div>
  );
}

export default WikiListPage;
