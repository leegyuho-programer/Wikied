'use client';

import { postArticles } from '@/api/article/articles';
import { postImage } from '@/api/image/postImage';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './PostingPage.module.css';
import { PostArticleResponseType } from '@/types/article';

interface FormData {
  title: string;
  content: string;
}

export default function PostingPage() {
  const accessToken = useStore((state) => state.userAccessToken);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadMutation = useMutation<PostArticleResponseType, Error, FormData>({
    mutationFn: async (data: FormData) => {
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

      return postArticles(requestBody, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] }); // Invalidate and refetch articles query
      alert('게시물이 성공적으로 업로드되었습니다.');
      router.push('/freeBoard');
    },
    onError: () => {
      alert('업로드에 실패했습니다.');
    },
  });

  const onSubmit = (data: FormData) => {
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
        <textarea
          placeholder="내용"
          {...register('content', { required: '내용을 입력해주세요.' })}
          className={styles.textarea}
        ></textarea>
        <input type="file" onChange={handleImageChange} className={styles.fileInput} />
        <button type="submit" className={styles.submitButton} disabled={isSubmitting || uploadMutation.isPending}>
          {uploadMutation.isPending ? '업로드 중...' : '게시물 업로드'}
        </button>
      </form>
    </div>
  );
}
