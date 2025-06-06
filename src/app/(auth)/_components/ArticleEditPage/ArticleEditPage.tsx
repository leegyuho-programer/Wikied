'use client';

import { getArticle, patchArticle } from '@/api/article/article';
import { postImage } from '@/api/image/postImage';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { GetArticleIdResponseType, PatchArticleRequestType, PatchArticleResponseType } from '@/types/article';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ArticleEditPage.module.css';

interface Props {
  title: string;
  content: string;
  image: FileList; // 이미지 파일 리스트
}

export default function ArticleEditPage() {
  useAuthCheck();
  const cookies = parseCookies();
  const accessToken = cookies.userAccessToken;
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 선택한 이미지 상태
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 URL

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Props>();

  const { data: article } = useQuery<GetArticleIdResponseType>({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
      setImagePreview(article.image); // 기존 이미지 URL로 미리보기 설정
    }
  }, [article, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]); // 첫 번째 파일만 설정
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 선택된 이미지의 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  const updateArticleMutation = useMutation<PatchArticleResponseType, Error, PatchArticleRequestType>({
    mutationFn: async (data: PatchArticleRequestType) => {
      let imageUrl = article?.image || ''; // 기본적으로 기존 이미지 사용
      if (selectedImage) {
        // 선택된 이미지가 있을 경우 업로드
        const imageUploadResponse = await postImage(selectedImage, accessToken);
        imageUrl = imageUploadResponse.url; // 새 이미지 URL로 변경
      }

      // 요청 본문 작성
      const requestBody: PatchArticleRequestType = {
        title: data.title,
        content: data.content,
        image: imageUrl, // 이미지 URL
      };

      return patchArticle(requestBody, articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      alert('게시물이 성공적으로 수정되었습니다.');
      router.replace(`/article/${articleId}`);
    },
    onError: (error) => {
      console.error('게시글 수정에 실패했습니다:', error);
      alert('수정에 실패했습니다.');
    },
  });

  const onSubmit = (data: Props) => {
    // FormData를 PatchArticleRequestType으로 변환하여 전달
    const requestData: PatchArticleRequestType = {
      title: data.title,
      content: data.content,
      image: '', // 이미지 URL은 mutationFn에서 처리하므로 기본값 설정
    };

    updateArticleMutation.mutate(requestData);
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

        {imagePreview && (
          <Image src={imagePreview} alt="미리보기" className={styles.imagePreview} width={500} height={400} />
        )}

        <input type="file" className={styles.fileInput} onChange={handleImageChange} />
        {errors.image && <p className={styles.error}>{errors.image.message}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || updateArticleMutation.isPending}
        >
          {updateArticleMutation.isPending ? '수정 중...' : '게시물 수정'}
        </button>
      </form>
    </div>
  );
}
