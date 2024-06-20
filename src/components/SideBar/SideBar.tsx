'use client';

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ArrowDownIcon from '../SvgComponents/ArrowDownIcon/ArrowDownIcon';
import ProfileIcon from '../SvgComponents/ProfileIcon/ProfileIcon';
import styles from './SideBar.module.css';
import { useStore } from '@/store';
import defaultIMG from '../../../public/images/default.jpg';
import Image from 'next/image';
import { postImage } from '@/api/image/postImage';
import CameraIcon from '../SvgComponents/CameraIcon/CameraIcon';
import { patchProfileCode } from '@/api/profile/profileCode';

interface Props {
  profileData: any;
  showEditButton: boolean;
}

function SideBar({ profileData, showEditButton }: Props) {
  const accessToken = useStore((state) => state.userAccessToken);
  const [showAll, setShowAll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 768);
  const [profileImage, setProfileImage] = useState<string | null>(profileData?.image || null);
  const [formData, setFormData] = useState({
    // image: profileData?.image || '',
    city: profileData?.city || '',
    mbti: profileData?.mbti || '',
    job: profileData?.job || '',
    sns: profileData?.sns || '',
    birthday: profileData?.birthday || '',
    nickname: profileData?.nickname || '',
    bloodType: profileData?.bloodType || '',
    nationality: profileData?.nationality || '',
  });

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await handleImageUpload(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (image: File) => {
    try {
      const response = await postImage(image, accessToken);
      console.log('Image upload response:', response);
      return response.url;
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      throw error;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedFormData = { ...formData, image: profileImage || undefined };
      const response = await patchProfileCode(updatedFormData, profileData?.code, accessToken);
      console.log('Profile Updated:', response);
    } catch (error) {
      console.error('프로필을 업데이트하는 데 실패했습니다:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [isSmallScreen]);

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <form className={styles.innerContainer} onSubmit={handleSubmit}>
          <div className={styles.profileContainer}>
            <label className={styles.label}>
              <Image
                src={profileImage ? profileImage : defaultIMG}
                alt="프로필 이미지"
                className={styles.profileImage}
                layout="fill"
                objectFit="cover"
              />
              {showEditButton && (
                <>
                  <input type="file" className={styles.input} onChange={handleFileChange} />
                  <CameraIcon className={styles.cameraIcon} />
                </>
              )}
            </label>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.lineWrapper}>
              <div className={styles.lineGroup1}>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="city">
                    거주 도시
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="서울"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="mbti">
                    MBTI
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="mbti"
                    value={formData.mbti}
                    placeholder="INFJ"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="job">
                    직업
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="job"
                    value={formData.job}
                    placeholder="코드잇 콘텐츠 프로듀서"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="sns">
                    SNS 계정
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="sns"
                    value={formData.sns}
                    placeholder="dlwlehd_official"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
              </div>
              <div className={`${styles.lineGroup2} ${showAll ? styles.show : ''}`}>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="birthday">
                    생일
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="birthday"
                    value={formData.birthday}
                    placeholder="1999-12-31"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="nickname">
                    별명
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    placeholder="없음"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="bloodType">
                    혈액형
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="bloodType"
                    value={formData.bloodType}
                    placeholder="A"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
                <div className={styles.line}>
                  <label className={styles.title} htmlFor="nationality">
                    국적
                  </label>
                  <input
                    className={styles.answer}
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    placeholder="대한민국"
                    onChange={handleInputChange}
                    readOnly={!showEditButton}
                  />
                </div>
              </div>
            </div>
          </div>
          {showEditButton && (
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.button}>
                수정하기
              </button>
            </div>
          )}
        </form>
        <button className={`${styles.arrowButton} ${showAll ? styles.rotate : ''}`} onClick={handleToggle}>
          <div className={styles.arrowButtonWrapper}>
            <ArrowDownIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SideBar;

// 'use client';

// import { useEffect, useState } from 'react';
// import Button from '../Button/Button';
// import ArrowDownIcon from '../SvgComponents/ArrowDownIcon/ArrowDownIcon';
// import ProfileIcon from '../SvgComponents/ProfileIcon/ProfileIcon';
// import styles from './SideBar.module.css';
// import { useStore } from '@/store';
// import defaultIMG from '../../../public/images/default.jpg';
// import Image from 'next/image';
// import { postImage } from '@/api/image/postImage';
// import CameraIcon from '../SvgComponents/CameraIcon/CameraIcon';
// import { patchProfileCode } from '@/api/profile/profileCode';

// interface Props {
//   profileData: any;
//   showEditButton: boolean;
// }

// function SideBar({ profileData, showEditButton }: Props) {
//   const accessToken = useStore((state) => state.userAccessToken);
//   const [showAll, setShowAll] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 768);
//   const [profileImage, setProfileImage] = useState<string | null>(profileData?.image || null);
//   const [formData, setFormData] = useState({
//     city: profileData?.city || '',
//     mbti: profileData?.mbti || '',
//     job: profileData?.job || '',
//     sns: profileData?.sns || '',
//     birthday: profileData?.birthday || '',
//     nickname: profileData?.nickname || '',
//     bloodType: profileData?.bloodType || '',
//     nationality: profileData?.nationality || '',
//   });
//   console.log('profileData', profileData);
//   const handleToggle = () => {
//     setShowAll(!showAll);
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       const imageUrl = await handleImageUpload(file);
//       setProfileImage(imageUrl);
//     } catch (error) {
//       console.error('이미지 업로드 중 오류:', error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = async (image: File) => {
//     try {
//       const response = await postImage(image, accessToken);
//       console.log('Image upload response:', response);
//       return response.url;
//     } catch (error) {
//       console.error('이미지 업로드 중 오류:', error);
//       throw error;
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const updatedFormData = { ...formData, image: profileImage || undefined };
//       const response = await patchProfileCode(updatedFormData, profileData?.code, accessToken);
//       console.log('Profile Updated:', response);
//     } catch (error) {
//       console.error('프로필을 업데이트하는 데 실패했습니다:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handleUpdateProfile();
//   };

//   useEffect(() => {
//     if (profileData) {
//       setFormData(profileData);
//     }
//   }, [profileData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth > 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (isSmallScreen) {
//       setShowAll(true);
//     } else {
//       setShowAll(false);
//     }
//   }, [isSmallScreen]);

//   return (
//     <div className={styles.containerWrapper}>
//       <div className={styles.container}>
//         <form className={styles.innerContainer} onSubmit={handleSubmit}>
//           <div className={styles.profileContainer}>
//             <label className={styles.label}>
//               <Image
//                 src={profileImage ? profileImage : defaultIMG}
//                 alt="프로필 이미지"
//                 className={styles.profileImage}
//                 layout="fill"
//                 objectFit="cover"
//               />
//               {showEditButton && (
//                 <>
//                   <input type="file" className={styles.input} onChange={handleFileChange} />
//                   <CameraIcon className={styles.cameraIcon} />
//                 </>
//               )}
//             </label>
//           </div>
//           <div className={styles.contentContainer}>
//             <div className={styles.lineWrapper}>
//               <div className={styles.lineGroup1}>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="city">
//                     거주 도시
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     placeholder="서울"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="mbti">
//                     MBTI
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="mbti"
//                     value={formData.mbti}
//                     placeholder="INFJ"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="job">
//                     직업
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="job"
//                     value={formData.job}
//                     placeholder="코드잇 콘텐츠 프로듀서"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="sns">
//                     SNS 계정
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="sns"
//                     value={formData.sns}
//                     placeholder="dlwlehd_official"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//               </div>
//               <div className={`${styles.lineGroup2} ${showAll ? styles.show : ''}`}>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="birthday">
//                     생일
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="birthday"
//                     value={formData.birthday}
//                     placeholder="1999-12-31"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="nickname">
//                     별명
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="nickname"
//                     value={formData.nickname}
//                     placeholder="없음"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="bloodType">
//                     혈액형
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="bloodType"
//                     value={formData.bloodType}
//                     placeholder="A"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//                 <div className={styles.line}>
//                   <label className={styles.title} htmlFor="nationality">
//                     국적
//                   </label>
//                   <input
//                     className={styles.answer}
//                     type="text"
//                     name="nationality"
//                     value={formData.nationality}
//                     placeholder="대한민국"
//                     onChange={handleInputChange}
//                     readOnly={!showEditButton}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {showEditButton && (
//             <div className={styles.buttonWrapper}>
//               <button type="submit" className={styles.button}>
//                 수정하기
//               </button>
//             </div>
//           )}
//         </form>
//         <button className={`${styles.arrowButton} ${showAll ? styles.rotate : ''}`} onClick={handleToggle}>
//           <div className={styles.arrowButtonWrapper}>
//             <ArrowDownIcon />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SideBar;
