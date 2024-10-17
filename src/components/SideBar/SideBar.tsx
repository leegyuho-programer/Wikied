'use client';

import { postImage } from '@/api/image/postImage';
import { patchProfileCode } from '@/api/profile/profileCode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import defaultIMG from '../../../public/images/default.jpg';
import ArrowDownIcon from '../SvgComponents/ArrowDownIcon/ArrowDownIcon';
import CameraIcon from '../SvgComponents/CameraIcon/CameraIcon';
import styles from './SideBar.module.css';

interface Props {
  profileData: any;
  showEditButton: boolean;
  className?: string;
}

function SideBar({ profileData, showEditButton, className }: Props) {
  const cookies = parseCookies();
  const accessToken = cookies.userAccessToken;
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return false;
  });
  const [profileImage, setProfileImage] = useState<string | null>(profileData?.image || null);
  const [formData, setFormData] = useState({
    image: profileData?.image || '',
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

  // Mutation for image upload
  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => postImage(file, accessToken),
    onSuccess: (data) => {
      setProfileImage(data.url);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: data.url,
      }));
    },
    onError: (error) => {
      console.error('이미지 업로드 중 오류:', error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateProfileMutation = useMutation({
    mutationFn: () =>
      patchProfileCode(
        {
          image: profileImage || undefined,
          city: formData.city,
          mbti: formData.mbti,
          job: formData.job,
          sns: formData.sns,
          birthday: formData.birthday,
          nickname: formData.nickname,
          bloodType: formData.bloodType,
          nationality: formData.nationality,
        },
        profileData?.code
      ),
    onSuccess: () => {
      alert('수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['profileCode', profileData?.code] });
    },
    onError: (error) => {
      console.error('프로필을 업데이트하는 데 실패했습니다:', error);
      alert(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setProfileImage(profileData.image || '');
    }
  }, [profileData]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth > 768);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
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
    <div className={`${styles.containerWrapper} ${className ? className : ''}`}>
      <div className={styles.container}>
        <form className={styles.innerContainer} onSubmit={handleSubmit}>
          <div className={`${styles.profileContainer} ${showEditButton ? styles.editable : ''}`}>
            <label className={`${styles.label} ${showEditButton ? styles.editable : ''}`}>
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
                    className={`${styles.answer} ${showEditButton ? styles.editableAnswer : ''}`}
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
              <button
                type="submit"
                className={`${styles.button} ${updateProfileMutation.isPending ? styles.buttonDisabled : ''}`}
                disabled={updateProfileMutation.isPending}
              >
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
