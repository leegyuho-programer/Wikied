'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postImage } from '@/api/image/postImage';
import { useStore } from '@/store';
import styles from './PostingPage.module.css';
import { postArticles } from '@/api/article/articles';
import { useRouter } from 'next/navigation';

export default function PostingPage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log('Selected image:', e.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    if (!image) {
      alert('이미지를 선택해주세요.');
      return;
    }

    try {
      // Step 2: 이미지 업로드
      const imageUploadResponse = await postImage(image, accessToken);
      console.log('Image upload response:', imageUploadResponse);
      const imageUrl = imageUploadResponse.url;

      // Step 3: 게시물 데이터 전송
      const requestBody = {
        ...data,
        image: imageUrl,
      };

      const response = await postArticles(requestBody, accessToken);
      console.log('Article upload response:', response);
      alert('게시물이 성공적으로 업로드되었습니다.');
      router.push('/freeBoard');
      return response;
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="게시물 제목입니다."
          {...register('title', { required: '제목을 입력해주세요.' })}
          className={styles.input}
        />
        <textarea
          placeholder="내용"
          {...register('content', { required: '내용을 입력해주세요.' })}
          className={styles.textarea}
        ></textarea>
        {/* {errors.content && <p className={styles.error}>{errors.content.message}</p>} */}

        <input type="file" onChange={handleImageChange} className={styles.fileInput} />
        {/* {errors.image && <p className={styles.error}>{errors.image.message}</p>} */}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          게시물 업로드
        </button>
      </form>
    </div>
  );
}
