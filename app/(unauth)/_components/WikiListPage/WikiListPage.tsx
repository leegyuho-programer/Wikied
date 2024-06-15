'use client';

import { useState, useEffect } from 'react';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import WikiIcon from '../../../../components/SvgComponents/WikiIcon/WikiIcon';
import Pagination from '../Pagination/Pagination';
import styles from './WikiListPage.module.css';
import { GetProfileCodeResponseType, GetProfileResponseType, PostProfileResponseType } from '../../../../types/profile';
import getProfile from '../../../../api/profile/getProfile';
import getProfileCode from '../../../../api/profile/getProfileCode';
import noResult from '../../../../public/images/noResult.png';
import Image from 'next/image';

function WikiListPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [profiles, setProfiles] = useState<GetProfileCodeResponseType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3); // 페이지 크기 고정 (필요에 따라 조정 가능)
  const [totalProfiles, setTotalProfiles] = useState(0); // 총 프로필 수

  const fetchProfiles = async (page: number, pageSize: number, searchTerm: string) => {
    try {
      const response: GetProfileResponseType = await getProfile(page, pageSize, searchTerm);
      if (searchTerm) {
        if (response.list.length > 0) {
          const codeId = response.list[0].code;
          const profiles: GetProfileCodeResponseType = await getProfileCode(codeId);
          setProfiles([profiles]);
        } else {
          setProfiles([]);
        }
      } else {
        const allProfiles = await Promise.all(response.list.map(async (profile) => await getProfileCode(profile.code)));
        setProfiles(allProfiles);
      }
      setTotalProfiles(response.totalCount); // 총 프로필 수 설정
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    }
  };

  useEffect(() => {
    fetchProfiles(page, pageSize, searchTerm);
  }, [page, pageSize, searchTerm]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(1); // 검색 시 페이지를 처음으로 리셋
  };

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
            <div key={profile.id} className={styles.wikiBox}>
              <div className={styles.profile}>
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <WikiIcon />
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
                  <LinkCopy onCopy={setIsCopied} />
                </div>
              </div>
            </div>
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
