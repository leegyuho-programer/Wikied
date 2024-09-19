// 'use client';

// import { getProfile } from '@/api/profile/profile';
// import { getProfileCode } from '@/api/profile/profileCode';
// import LinkCopy from '@/components/LinkCopy/LinkCopy';
// import SearchBar from '@/components/SearchBar/SearchBar';
// import { useStore } from '@/store';
// import { GetProfileCodeResponseType } from '@/types/profile';
// import { useQuery } from '@tanstack/react-query';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import defaultIMG from '../../../../../public/images/default.jpg';
// import noResult from '../../../../../public/images/noResult.png';
// import Pagination from '../Pagination/Pagination';
// import styles from './WikiListPage.module.css';
// import WikiListPageSkeleton from './WikiListPageSkeleton';

// function WikiListPage() {
//   const { user } = useStore((state: any) => ({
//     user: state.user,
//   }));

//   const [isCopied, setIsCopied] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const pageSize = 3; // 페이지 크기 고정 (필요에 따라 조정 가능)

//   const fetchProfiles = async () => {
//     const response = await getProfile(page, pageSize, searchTerm);
//     const profiles = await Promise.all(response.list.map(async (profile) => getProfileCode(profile.code)));
//     return { profiles, totalCount: response.totalCount };
//   };

//   const { data, isPending } = useQuery({
//     queryKey: ['profiles', page, pageSize, searchTerm],
//     queryFn: fetchProfiles,
//     placeholderData: (previousData) => previousData,
//   });

//   const handleSearch = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//     setPage(1); // 검색 시 페이지를 처음으로 리셋
//   };

//   if (isPending) return <WikiListPageSkeleton />;

//   const profiles = data?.profiles.filter((profile) => profile.id !== user.profile.id) || [];
//   const totalProfiles = data?.totalCount || 0;

//   return (
//     <div className={styles.container}>
//       <div className={styles.search}>
//         <SearchBar onSearch={handleSearch} />
//         <p className={styles.text}>{`${
//           searchTerm ? `"${searchTerm}"님을(를) ` : ''
//         }총 ${totalProfiles}명 찾았습니다.`}</p>
//       </div>
//       <div className={styles.wikiBoxContainer}>
//         {profiles.length > 0 ? (
//           profiles.map((profile: GetProfileCodeResponseType) => (
//             <Link key={profile.id} className={styles.wikiBox} href={`/user/${profile.id}`} passHref>
//               <div className={styles.profile}>
//                 <div className={styles.info}>
//                   <div className={styles.imageWrapper}>
//                     <Image
//                       src={profile.image || defaultIMG}
//                       alt={`${profile.name}의 프로필 이미지`}
//                       style={{ objectFit: 'fill', width: '100%', height: '100%' }}
//                       width={85}
//                       height={85}
//                     />
//                   </div>
//                   <div className={styles.intro}>
//                     <p className={styles.name}>{profile.name}</p>
//                     <p className={styles.data}>
//                       {profile.city} {profile.nationality}
//                       <br />
//                       {profile.job}
//                     </p>
//                   </div>
//                 </div>
//                 <div className={styles.link}>
//                   {profile.id && <LinkCopy profileId={profile.id} onCopy={setIsCopied} />}
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className={styles.noResultContainer}>
//             <div className={styles.noResults}>{`"${searchTerm}" 일치하는 검색 결과가 없어요.`}</div>
//             <Image src={noResult} width={144} height={144} alt="검색 결과 없음 이미지" />
//           </div>
//         )}
//       </div>
//       {profiles.length > 0 && (
//         <Pagination
//           currentPage={page}
//           onPageChange={setPage}
//           totalArticles={totalProfiles}
//           pageCount={Math.ceil(totalProfiles / pageSize)}
//           articlesPerPage={pageSize}
//         />
//       )}
//     </div>
//   );
// }

// export default WikiListPage;

'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import defaultIMG from '../../../../../public/images/default.jpg';
import noResult from '../../../../../public/images/noResult.png';
import Pagination from '../Pagination/Pagination';
import styles from './WikiListPage.module.css';
import WikiListPageSkeleton from './WikiListPageSkeleton';

// function WikiListPage() {
//   const { user } = useStore((state: any) => ({
//     user: state.user,
//   }));

//   const [isCopied, setIsCopied] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const pageSize = 3;

//   const fetchProfiles = async () => {
//     let fetchedProfiles: GetProfileCodeResponseType[] = [];
//     let totalCount = 0;
//     let currentPage = page;

//     while (fetchedProfiles.length < pageSize) {
//       const response = await getProfile(currentPage, pageSize, searchTerm);
//       const profiles = await Promise.all(response.list.map(async (profile: any) => getProfileCode(profile.code)));

//       fetchedProfiles = [...fetchedProfiles, ...profiles.filter((profile: any) => profile.id !== user.profile.id)];
//       totalCount = response.totalCount;

//       if (fetchedProfiles.length >= pageSize || profiles.length < pageSize) {
//         break;
//       }

//       currentPage++;
//     }

//     return {
//       profiles: fetchedProfiles.slice(0, pageSize),
//       totalCount: totalCount - 1, // Subtract 1 to account for the user's own profile
//     };
//   };

//   const { data, isPending } = useQuery({
//     queryKey: ['profiles', page, pageSize, searchTerm],
//     queryFn: fetchProfiles,
//     placeholderData: (previousData) => previousData,
//   });

//   const handleSearch = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//     setPage(1);
//   };

//   if (isPending) return <WikiListPageSkeleton />;

//   const profiles = data?.profiles || [];
//   const totalProfiles = data?.totalCount || 0;

//   return (
//     <div className={styles.container}>
//       <div className={styles.search}>
//         <SearchBar onSearch={handleSearch} />
//         <p className={styles.text}>{`${
//           searchTerm ? `"${searchTerm}"님을(를) ` : ''
//         }총 ${totalProfiles}명 찾았습니다.`}</p>
//       </div>
//       <div className={styles.wikiBoxContainer}>
//         {profiles.length > 0 ? (
//           profiles.map((profile: GetProfileCodeResponseType) => (
//             <Link key={profile.id} className={styles.wikiBox} href={`/user/${profile.id}`} passHref>
//               <div className={styles.profile}>
//                 <div className={styles.info}>
//                   <div className={styles.imageWrapper}>
//                     <Image
//                       src={profile.image || defaultIMG}
//                       alt={`${profile.name}의 프로필 이미지`}
//                       style={{ objectFit: 'fill', width: '100%', height: '100%' }}
//                       width={85}
//                       height={85}
//                     />
//                   </div>
//                   <div className={styles.intro}>
//                     <p className={styles.name}>{profile.name}</p>
//                     <p className={styles.data}>
//                       {profile.city} {profile.nationality}
//                       <br />
//                       {profile.job}
//                     </p>
//                   </div>
//                 </div>
//                 <div className={styles.link}>
//                   {profile.id && <LinkCopy profileId={profile.id} onCopy={setIsCopied} />}
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className={styles.noResultContainer}>
//             <div className={styles.noResults}>{`"${searchTerm}" 일치하는 검색 결과가 없어요.`}</div>
//             <Image src={noResult} width={144} height={144} alt="검색 결과 없음 이미지" />
//           </div>
//         )}
//       </div>
//       {profiles.length > 0 && (
//         <Pagination
//           currentPage={page}
//           onPageChange={setPage}
//           totalArticles={totalProfiles}
//           pageCount={Math.ceil(totalProfiles / pageSize)}
//           articlesPerPage={pageSize}
//         />
//       )}
//     </div>
//   );
// }

// export default WikiListPage;

function WikiListPage() {
  const { user } = useStore((state: any) => ({
    user: state.user,
  }));

  const [isCopied, setIsCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const fetchProfiles = useCallback(async () => {
    let allProfiles: GetProfileCodeResponseType[] = [];
    let currentPage = 1;
    let totalCount = 0;

    while (true) {
      const response = await getProfile(currentPage, pageSize * 2, searchTerm); // Fetch double the pageSize
      const profiles = await Promise.all(response.list.map(async (profile) => getProfileCode(profile.code)));

      const filteredProfiles = profiles.filter((profile) => profile.id !== user.profile.id);
      allProfiles = [...allProfiles, ...filteredProfiles];
      totalCount = response.totalCount - 1; // 본인을 제외해야 하기 때문에 - 1

      if (profiles.length < pageSize * 2 || allProfiles.length >= totalCount) {
        break;
      }

      currentPage++;
    }

    const startIndex = (page - 1) * pageSize;
    const paginatedProfiles = allProfiles.slice(startIndex, startIndex + pageSize);

    return { profiles: paginatedProfiles, totalCount };
  }, [page, pageSize, searchTerm, user.profile.id]);

  const { data, isPending } = useQuery({
    queryKey: ['profiles', page, pageSize, searchTerm],
    queryFn: fetchProfiles,
    placeholderData: (previousData) => previousData,
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
          profiles.map((profile: GetProfileCodeResponseType) => (
            <Link key={profile.id} className={styles.wikiBox} href={`/user/${profile.id}`} passHref>
              <div className={styles.profile}>
                <div className={styles.info}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={profile.image || defaultIMG}
                      alt={`${profile.name}의 프로필 이미지`}
                      style={{ objectFit: 'fill', width: '100%', height: '100%' }}
                      width={85}
                      height={85}
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
