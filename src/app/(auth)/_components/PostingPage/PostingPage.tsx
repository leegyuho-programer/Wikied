'use client';

import { postArticles } from '@/api/article/articles';
import { postImage } from '@/api/image/postImage';
import { PostArticleResponseType } from '@/types/article';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostingPage.module.css';
import Image from 'next/image';

interface Props {
  title: string;
  content: string;
  image: string;
}

export default function PostingPage() {
  const cookies = parseCookies();
  const accessToken = cookies.userAccessToken;
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Props>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 URL

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // FileReader를 사용하여 이미지 미리보기 URL 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage); // 파일을 Data URL로 읽기
    }
  };

  const uploadMutation = useMutation<PostArticleResponseType, Error, Props>({
    mutationFn: async (data: Props) => {
      if (!image) {
        throw new Error('이미지를 선택해주세요.');
      }

      // Step 2: 이미지 업로드
      const imageUploadResponse = await postImage(image, accessToken);
      const imageUrl = imageUploadResponse.url;

      // Step 3: 게시물 데이터 전송
      const requestBody = {
        ...data,
        image: imageUrl,
      };

      return postArticles(requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      alert('게시물이 성공적으로 업로드되었습니다.');
      router.replace('/freeBoard');
    },
    onError: () => {
      alert('업로드에 실패했습니다.');
    },
  });

  const onSubmit = (data: Props) => {
    uploadMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="게시물 제목입니다."
          {...register('title', { required: '제목을 입력해주세요.' })}
          className={styles.input}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <textarea
          placeholder="내용"
          {...register('content', { required: '내용을 입력해주세요.' })}
          className={styles.textarea}
        ></textarea>
        {errors.content && <p className={styles.error}>{errors.content.message}</p>}

        <input
          type="file"
          className={styles.fileInput}
          {...register('image', { required: '이미지를 선택해주세요.' })}
          onChange={handleImageChange}
        />
        {errors.image && <p className={styles.error}>{errors.image.message}</p>}

        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <Image src={imagePreview} alt="미리보기" className={styles.imagePreview} width={500} height={400} />
          </div>
        )}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting || uploadMutation.isPending}>
          {uploadMutation.isPending ? '업로드 중...' : '게시물 업로드'}
        </button>
      </form>
    </div>
  );
}
